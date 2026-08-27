/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2020-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 旧cubism3_layer（frozen）は非公式ラッパー（LIVE2DCUBISMPIXI/LIVE2DCUBISMFRAMEWORK）＋
//	pixi.js v6 Loader前提で、Cubism 5系のCoreとは非互換（動作しない）。本ファイルは
//	3d_layer/ThreeDLayer.tsと同じ「DOM直描画方式」（Layerの素divへcanvasをappendChild）
//	で、公式Cubism Web SDK for Web 5-r.5（./framework/配下）を直接呼び出して作り直したもの。
//	API呼び出し順序・行列計算は公式サンプル（https://github.com/Live2D/CubismWebSamples
//	Samples/TypeScript/Demo/src/lappmodel.ts, lapplive2dmanager.ts, lappview.ts,
//	lappsubdelegate.ts, lapptexturemanager.ts）を参照して移植。ただし公式サンプルは
//	「1 canvasを複数モデルで共有する」設計（LAppSubdelegate/LAppGlManager）なのに対し、
//	本家は3d_layer同様「Layerインスタンス毎に独立したcanvas+WebGLコンテキスト」を持たせる
//	（複数キャラ同時表示でコンテキストが競合しない）。そのため以下は公式サンプルから削って
//	いる：LAppDelegate/LAppSubdelegate/LAppGlManager相当のcanvas共有層、表情(Expression)・
//	ポーズ(Pose)・ユーザーデータ・ドラッグ追従(CubismLook)・当たり判定・リップシンク・
//	CubismUpdateScheduler（5-r.5新設のUpdater登録機構。呼び出し先のCubismBreath/
//	CubismEyeBlink/CubismPhysicsのupdateParameters()/evaluate()自体は5-r.5でも従来と
//	変わらず直接呼べるため、Scheduler経由にせず本体updateループから直接呼ぶ）。
//	CubismWebGLOffscreenManager（オフスクリーン合成用の新設マネージャ）もbindTexture／
//	drawModelの基本経路には関与しないため未使用（gl単位でMapされるので複数コンテキストでも
//	安全だが、今回のモデルはオフスクリーンパーツ合成もクリッピングマスクも使わないため不要）。

import type {TArg, T_PluginInitArg} from '@famibee/skynovel_esm/web';
import {PlgLayer, argChk_Num} from '@famibee/skynovel_esm/web';

import {CubismFramework, LogLevel, Option} from './framework/live2dcubismframework';
import {CubismModelSettingJson} from './framework/cubismmodelsettingjson';
import type {ICubismModelSetting} from './framework/icubismmodelsetting';
import {CubismUserModel} from './framework/model/cubismusermodel';
import {CubismMatrix44} from './framework/math/cubismmatrix44';
import {CubismEyeBlink} from './framework/effect/cubismeyeblink';
import {CubismBreath, BreathParameterData} from './framework/effect/cubismbreath';
import {CubismDefaultParameterId} from './framework/cubismdefaultparameterid';
import type {CubismMotion} from './framework/motion/cubismmotion';
import {CubismShaderManager_WebGL} from './framework/rendering/cubismshader_webgl';

/// <reference path="./live2dcubismcore.d.ts" />
	// エラーは上のファイルを開くと消える（3d_layer/ThreeDLayer.tsのeffekseer.d.tsと同じ事情）

const MOTION_PRIORITY_IDLE   = 1;	// 本家サンプルのPriorityIdle
const MOTION_PRIORITY_NORMAL = 2;	// 本家サンプルのPriorityNormal
const IDLE_GROUP_DEF = 'Idle';		// label省略時に自動再生する待機モーショングループ名の既定値


// 公式サンプルLAppModel相当。1インスタンス＝1モデル＝1canvas+1WebGLコンテキスト前提
//	（本家サンプルのLAppSubdelegate/LAppTextureManagerが担っていた「canvas共有」の都合を
//	排し、必要な最小限をこのクラスへ直接持たせている）
class Live2DModel extends CubismUserModel {
	#gl!: WebGL2RenderingContext;
	#fbo!: WebGLFramebuffer;	// 描画先の既定フレームバッファ（canvas直描画ならnull。
		// gl.getParameter()の戻り型はanyなのでnull代入時もWebGLFramebuffer型のまま扱える
		//	＝公式サンプルLAppSubdelegate._frameBufferと同じ trick
	#textures: {fn: string, id: WebGLTexture}[] = [];

	// モデル一式を読み込み、レンダラまで準備する。参照実装：lappmodel.ts setupModel()
	//	（Expression/Pose/UserDataは対象モデルに存在しないため省略、モーションは全グループ
	//	先読み。本家のLoadStep状態機械は使わず、await連結で素直に書く）
	async load(gl: WebGL2RenderingContext, homeDir: string, model3Fn: string) {
		this.#gl = gl;
		this.#fbo = gl.getParameter(gl.FRAMEBUFFER_BINDING);

		const buf = await (await fetch(homeDir + model3Fn)).arrayBuffer();
		const setting: ICubismModelSetting = new CubismModelSettingJson(buf, buf.byteLength);

		const mocFn = setting.getModelFileName();
		if (! mocFn) throw `[live2d] model3.jsonにMocが指定されていません（${model3Fn}）`;
		this.loadModel(await (await fetch(homeDir + mocFn)).arrayBuffer(), true);

		const physicsFn = setting.getPhysicsFileName();
		if (physicsFn) {
			const pb = await (await fetch(homeDir + physicsFn)).arrayBuffer();
			this.loadPhysics(pb, pb.byteLength);
		}

		// レイアウト（Layout未指定モデルはsetupFromLayout(空Map)で既定値に）
		const layout = new Map<string, number>();
		setting.getLayoutMap(layout);
		this.getModelMatrix().setupFromLayout(layout);

		// 自動まばたき（対象パラメータが無いモデルはparameterIds空になるだけで無害）
		if (setting.getEyeBlinkParameterCount() > 0) this._eyeBlink = CubismEyeBlink.create(setting);

		// モーションのCubismMotion#_eyeBlinkParameterIds/_lipSyncParameterIdsは既定null
		//	（コンストラクタ参照）で、setEffectIds()を呼ばないとtick()でのupdateParameters()が
		//	null.lengthを読んで例外になる。本家サンプルはpreLoadMotionGroup()でモーション読込
		//	直後に必ず呼んでいる（LipSyncは今回未対応だが空配列で渡す）
		const eyeBlinkIds: unknown[] = [];
		for (let i = 0; i < setting.getEyeBlinkParameterCount(); i++) eyeBlinkIds.push(setting.getEyeBlinkParameterId(i));

		// 呼吸（本家サンプルlappmodel.ts setupBreath()と同じ既定パラメータ）
		this._breath = CubismBreath.create();
		this._breath.setParameters([
			new BreathParameterData(this.#idParamAngleX, 0, 15, 6.5345, 0.5),
			new BreathParameterData(this.#idParamAngleY, 0, 8, 3.5345, 0.5),
			new BreathParameterData(this.#idParamAngleZ, 0, 10, 5.5345, 0.5),
			new BreathParameterData(this.#idParamBodyAngleX, 0, 4, 15.5345, 0.5),
			new BreathParameterData(
				CubismFramework.getIdManager().getId(<string>CubismDefaultParameterId.ParamBreath),
				0.5, 0.5, 3.2345, 1
			),
		]);

		// モーション全グループ先読み（グループ名はmodel3.json記載のまま。例：Idle/Flick/…）
		const groupCnt = setting.getMotionGroupCount();
		for (let gi = 0; gi < groupCnt; gi++) {
			const group = setting.getMotionGroupName(gi);
			const cnt = setting.getMotionCount(group);
			for (let mi = 0; mi < cnt; mi++) {
				const fn = setting.getMotionFileName(group, mi);
				const mb = await (await fetch(homeDir + fn)).arrayBuffer();
				const motion = this.loadMotion(mb, mb.byteLength, `${group}_${mi}`,
					undefined, undefined, setting, group, mi, true);
				if (motion) {
					motion.setEffectIds(<any>eyeBlinkIds, []);
					this.#hMotion[`${group}_${mi}`] = motion;
				}
			}
			this.#hGroupCnt[group] = cnt;
		}

		// テクスチャ（本家サンプルのLAppTextureManager.createTextureFromPngFile相当を
		//	自前canvas＝自前glに対して直接行う）
		const texCnt = setting.getTextureCount();
		for (let ti = 0; ti < texCnt; ti++) {
			const fn = setting.getTextureFileName(ti);
			if (! fn) continue;
			this.#textures.push({fn, id: await this.#loadTexture(homeDir + fn)});
		}

		this.createRenderer(gl.canvas.width, gl.canvas.height);
		this.getRenderer().startUp(gl);
		this.getRenderer().setIsPremultipliedAlpha(true);
		this.#textures.map((t, i)=> this.getRenderer().bindTexture(i, t.id));
		// シェーダーは本来drawModel()内部（doDrawModel()）で初回描画時に遅延ロードされるが、
		//	draw()側でロード完了までdrawModel()自体の呼び出しをスキップするようにしたため
		//	（CubismLogWarning対策）、ここで明示的に先読みを開始しておかないと
		//	「drawModel()を呼ばない→シェーダーが読み込まれない→いつまでもdrawModel()を呼べない」
		//	というデッドロックになる
		this.getRenderer().loadShaders(SHADER_PATH);

		this._model.saveParameters();
		this._motionManager.stopAllMotions();
	}
	// 呼吸パラメータ用の標準ID（CubismFramework.initialize()後でないと取得できない）
	readonly #idParamAngleX     = CubismFramework.getIdManager().getId(<string>CubismDefaultParameterId.ParamAngleX);
	readonly #idParamAngleY     = CubismFramework.getIdManager().getId(<string>CubismDefaultParameterId.ParamAngleY);
	readonly #idParamAngleZ     = CubismFramework.getIdManager().getId(<string>CubismDefaultParameterId.ParamAngleZ);
	readonly #idParamBodyAngleX = CubismFramework.getIdManager().getId(<string>CubismDefaultParameterId.ParamBodyAngleX);

	#hMotion: {[nameIdx: string]: CubismMotion} = {};
	#hGroupCnt: {[group: string]: number} = {};

	async #loadTexture(url: string): Promise<WebGLTexture> {
		const gl = this.#gl;
		const img = new Image();
		await new Promise<void>((res, rej)=> {
			img.addEventListener('load', ()=> res(), {passive: true});
			img.addEventListener('error', ()=> rej(`[live2d] テクスチャの読込に失敗：${url}`), {passive: true});
			img.src = url;
		});

		const tex = gl.createTexture();
		if (! tex) throw '[live2d] createTexture()に失敗しました';
		gl.bindTexture(gl.TEXTURE_2D, tex);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);	// premultiplied alpha前提（setIsPremultipliedAlpha(true)と対）
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
		return tex;
	}

	// 指定モーショングループ内からランダムに1本再生を開始する。参照実装：lappmodel.ts startRandomMotion()
	playGroup(group: string, priority = MOTION_PRIORITY_NORMAL): boolean {
		const cnt = this.#hGroupCnt[group];
		if (! cnt) return false;	// 存在しないグループはエラーにせずfalse（[lay]の引数ミスで止めないため）

		if (priority !== MOTION_PRIORITY_IDLE && ! this._motionManager.reserveMotion(priority)) return false;
		const idx = Math.floor(Math.random() *cnt);
		const motion = this.#hMotion[`${group}_${idx}`];
		if (! motion) return false;
		this._motionManager.startMotionPriority(motion, false, priority);
		return true;
	}

	#idleGroup = IDLE_GROUP_DEF;
	setIdleGroup(group: string) {this.#idleGroup = group}

	// 参照実装：lappmodel.ts update()。Expression/Pose/UserData/Lookは非対応のため省略
	tick(deltaSec: number) {
		this._model.loadParameters();

		if (this._motionManager.isFinished()) this.playGroup(this.#idleGroup, MOTION_PRIORITY_IDLE);
		else this._motionManager.updateMotion(this._model, deltaSec);

		this._model.saveParameters();

		this._breath?.updateParameters(this._model, deltaSec);
		this._eyeBlink?.updateParameters(this._model, deltaSec);
		this._physics?.evaluate(this._model, deltaSec);

		this._model.update();
	}

	// 参照実装：lapplive2dmanager.ts onUpdate()のprojection計算＋lappmodel.ts draw()
	draw(canvasW: number, canvasH: number) {
		// シェーダーはCubismShader_WebGL#loadShaders()でfetch()完了まで非同期ロード中（コメント
		//	参照）。ロード未完のままdrawModel()を呼ぶとCubismShader_WebGL側が毎フレーム
		//	CubismLogWarning('Shader program is not initialized.')を出し続けるため、
		//	ロード完了（_isShaderLoaded）まではこちらから描画自体をスキップして黙らせる
		//	（フレームワーク本体には手を入れず、公開同然のフラグを外から覗くだけに留める）
		if (! CubismShaderManager_WebGL.getInstance().getShader(this.#gl)?._isShaderLoaded) return;

		const projection = new CubismMatrix44();
		if (this._model.getCanvasWidth() > 1 && canvasW < canvasH) {
			this.getModelMatrix().setWidth(2);
			projection.scale(1, canvasW /canvasH);
		}
		else projection.scale(canvasH /canvasW, 1);

		projection.multiplyByMatrix(this.getModelMatrix());
		this.getRenderer().setMvpMatrix(projection);
		this.getRenderer().setRenderState(this.#fbo, [0, 0, canvasW, canvasH]);
		this.getRenderer().drawModel(SHADER_PATH);
	}

}

// 相対パス（fetch()はdocument.baseURI基準で解決されるため、vite.config.tsのbase
//	（'/SKYNovel_gallery/'）配下でも崩れない＝index.html:71の`./plugin_lib/…`と同じ考え方）。
//	シェーダ本体はpublic/plugin_lib/live2d_shaders/に配置（Coreと同じ「常時public配信」の
//	扱い。本体はCubismShader_WebGL#loadShaders()がfetch()で非同期に読みに行くため、初回描画は
//	数フレーム遅れるが実害無し＝CubismRenderer_WebGL.drawModel()はロード未完なら警告を出す
//	だけで安全に無描画スキップする）
const SHADER_PATH = './plugin_lib/live2d_shaders/';


export class Live2DLayer extends PlgLayer {
	static	#started = false;
	static	async init() {	// CubismFramework.startUp()/initialize()は一度だけでよい
		if (Live2DLayer.#started) return;
		Live2DLayer.#started = true;

		const opt = new Option();
		opt.logFunction = (msg: string)=> console.log(msg);
		opt.loggingLevel = LogLevel.LogLevel_Warning;
		CubismFramework.startUp(opt);
		CubismFramework.initialize();
	}

	static	#stageW = 0;
	static	#stageH = 0;

	#canvas?: HTMLCanvasElement;
	#gl?: WebGL2RenderingContext;

	constructor(private pia: T_PluginInitArg) {
		super();

		if (Live2DLayer.#stageW === 0) {
			const {window: {width, height}} = pia.getInfo();
			Live2DLayer.#stageW = width;
			Live2DLayer.#stageH = height;
		}
	}

	// WebGLコンテキストは初回の#loadModel()まで作らない（遅延生成）。
	//	本家 skynovel_esm の [add_lay] は1レイヤ名につき表裏2インスタンスを生成し、[trans]の
	//	たびに Pages が表裏の参照を入れ替える（Pages.transPage）。旧「偶数番インスタンスだけ
	//	実体を持つ（#uniq_num % 2）」最適化だと、trans を1回挟むと実体無しインスタンスが表に
	//	回って [lay fn=] が黙って効かなくなるため廃止。実体を持たないインスタンスは
	//	WebGLコンテキストも消費しない
	#ensureGL(): WebGL2RenderingContext {
		if (this.#gl) return this.#gl;

		const canvas = this.#canvas = document.createElement('canvas');
		canvas.width  = Live2DLayer.#stageW;
		canvas.height = Live2DLayer.#stageH;
		// preserveDrawingBuffer: true は[snapshot]対策（src/ts/Snapshot.ts参照）。既定falseだと
		//	次の描画・合成のタイミングでバッファが暗黙にクリアされるため、rAFループの外から
		//	任意のタイミングでcanvas.toDataURL()を呼ぶ[snapshot]が黒画像を拾う恐れがある
		const gl = canvas.getContext('webgl2', {premultipliedAlpha: true, alpha: true, preserveDrawingBuffer: true});
		if (! gl) throw '[live2d] WebGL2が使用できません';
		this.#gl = gl;
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		// this.htm（PlgLayerが用意する position:absolute・ステージ実寸の素div）へcanvasを
		//	中央寄せで挿す。3d_layer/ThreeDLayer.tsと同じDOM構造
		canvas.style.position  = 'absolute';
		canvas.style.left = '50%';
		canvas.style.top  = '50%';
		canvas.style.transform = 'translate(-50%, -50%)';
		this.htm.appendChild(canvas);
		return gl;
	}


	#model?: Live2DModel;
	#running = false;
	#lastT = 0;
	#tick = (t: number)=> {
		if (! this.#running) return;

		const dt = this.#lastT ? (t -this.#lastT) /1000 : 0;
		this.#lastT = t;

		if (this.#model && this.#gl && this.#canvas) {
			this.#model.tick(dt);
			const gl = this.#gl;
			gl.clearColor(0, 0, 0, 0);	// 透過（画像レイヤ等と重ねるため）
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			this.#model.draw(this.#canvas.width, this.#canvas.height);
		}
		requestAnimationFrame(this.#tick);
	}

	#fn = '';
	#scale = 1;
	// fn指定でのモデル新規ロード（[lay]初回とplayback()の両方から使う共通処理）
	#loadModel(fn: string, label?: string): Promise<void> {
		this.#fn = fn;
		const gl = this.#ensureGL();
		const model = this.#model = new Live2DModel();
		const dir = this.pia.searchPath(fn, <any>'model3_|model3').replace(/[^/]+$/, '');
			// searchPath()はファイル本体のURLを返すため、ディレクトリだけ切り出す
			//	（本家サンプルのmodelHomeDir相当。以降のFileReferences相対パス解決に使う）
		return model.load(gl, dir, `${fn}.model3.json`).then(()=> {
			if (label) model.setIdleGroup(label);
			if (! this.#running) {this.#running = true; this.#lastT = 0; requestAnimationFrame(this.#tick);}
		});
	}

	override lay(hArg: TArg): boolean {
		const fn = hArg.fn;
		if (fn) {
			void this.#loadModel(String(fn), hArg.label ? String(hArg.label) : undefined)
				.then(()=> this.pia.resume());
			return true;	// ロード完了まで[lay]で止める（isWait）
		}

		if (! this.#model) return false;

		if ('label' in hArg) {
			const label = String(hArg.label || IDLE_GROUP_DEF);
			// 既存モーショングループを単発再生（優先度NORMAL）。tick()内の待機自動再生
			//	（優先度IDLE）より優先度が高いので割り込める。再生できた場合はそのグループを
			//	待機グループとしても採用する（[lay label=Idle]で「待機へ戻す」動作にもなる）
			if (this.#model.playGroup(label, MOTION_PRIORITY_NORMAL)) this.#model.setIdleGroup(label);
		}

		if ('scale' in hArg) this.#applyScale(argChk_Num(hArg, 'scale', 1));

		return false;
	}
	// モデル座標系の拡縮に相当するプロパティがCubism側に無いため、canvas自体のCSS transform
	//	で代用する（3d_layerのThree.jsオブジェクトscaleに相当）。中央寄せtranslateと合成
	#applyScale(s: number) {
		this.#scale = s;
		this.#canvas!.style.transform = `translate(-50%, -50%) scale(${s})`;
	}

	override clearLay(hArg: TArg): void {
		super.clearLay(hArg);
		if (! this.#gl) return;

		this.#running = false;
		this.#model?.release();
		this.#model = undefined;
		this.#fn = '';
		this.#gl.clear(this.#gl.COLOR_BUFFER_BIT | this.#gl.DEPTH_BUFFER_BIT);
	}

	override record = ()=> Object.assign(super.record(), {
		fn: this.#fn, scale: this.#scale,
	});
	override playback(hLay: any, aPrm: Promise<void>[]): void {
		super.playback(hLay, aPrm);
		if (! hLay.fn) return;

		aPrm.push(this.#loadModel(hLay.fn).then(()=> {
			if (hLay.scale && hLay.scale !== 1) this.#applyScale(hLay.scale);
		}));
	}

	override dump(): string {
		if (! this.#gl) return `"is":"nothing"`;
		return super.dump() +`, "live2d":{"fn":"${this.#fn}"}`;
	}

	// [snapshot]（Web版）。PlgLayerのヘルパでcanvasをPIXI Texture化して焼き込む。
	//	canvasはpreserveDrawingBuffer:trueなのでrAFループ外から読んでも中身が残っている
	override snapshot(rnd: any, re: ()=> void): void {
		if (! this.#canvas) {re(); return}
		this.snapshotByCanvas(this.#canvas, rnd, re);
	}

	// プロジェクト切替（SysBase.stop/run → LayerMng.destroy → Pages.destroy）で必ず呼ばれる
	//	唯一の後始末口。自前rAFループの停止とWebGLコンテキストの明示解放を行う（未実装だと
	//	切替のたびにコンテキストがリークし、ブラウザの同時数上限に達する）
	override destroy(): void {
		super.destroy();	// PlgLayer: ticker解除・htm.remove()
		this.#running = false;
		this.#model?.release();
		this.#model = undefined;
		this.#gl?.getExtension('WEBGL_lose_context')?.loseContext();
		this.#gl = undefined;
		this.#canvas = undefined;
	}

}
