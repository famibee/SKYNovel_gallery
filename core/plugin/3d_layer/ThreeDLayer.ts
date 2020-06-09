/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const {Layer, CmnLib, argChk_Num, argChk_Boolean} = require('@famibee/skynovel/web');
import {HArg, IPluginInitArg} from '@famibee/skynovel';
import {Scene, WebGLRenderer, Camera, Clock, GridHelper, PerspectiveCamera, DirectionalLight, Mesh, BoxGeometry, MeshNormalMaterial, SphereGeometry, TextureLoader, LinearFilter, MeshBasicMaterial, AnimationClip, LoopRepeat, LoopOnce, Material, Object3D, AnimationMixer} from 'three';

import {Sprite, Texture} from 'pixi.js';

const EXT_STILL_IMG = 'png_|jpg_|jpeg_|svg_|png|jpg|jpeg|svg';

export class ThreeDLayer extends Layer {
	static	plgArg	: IPluginInitArg;
	private	static	uniq_num = 0;

	static	THREE		: any;
	private scene_3D	: Scene;
	private	canvas_3D	: WebGLRenderer;
	private sprite_3D	: Sprite;

	private camera		: Camera;

	constructor() {
		super();

		if (ThreeDLayer.uniq_num++ % 2 == 1) return;

		this.scene_3D = new Scene();
		const log = console.log;	// 「THREE.WebGLRenderer 100」を消したい
		console.log = ()=> {};
		this.canvas_3D	= new WebGLRenderer({antialias: true, alpha: true});
		console.log = log;

		// 3D Scene canvas
		this.canvas_3D.setSize(CmnLib.stageW, CmnLib.stageH);
		this.canvas_3D.setPixelRatio(window.devicePixelRatio);

		// Map 3D canvas to 2D Canvas
		const texture_3D = Texture.from(this.canvas_3D.domElement);
		this.sprite_3D = new Sprite(texture_3D);
		this.cnt.addChild(this.sprite_3D);
		this.sprite_3D.x = (CmnLib.stageW -this.sprite_3D.width) /2
		this.sprite_3D.y = (CmnLib.stageH -this.sprite_3D.height) /2
	}
	private tick = ()=> {
		if (! this.running) return;

		this.canvas_3D.render(this.scene_3D, this.camera);
		this.sprite_3D.texture.update();	//tell pixi that threejs changed
		this.fncCtrl();
		this.fncMixerUpd();
		requestAnimationFrame(this.tick);
	}
	private running = false;
	private fncCtrl = ()=> {};

	private fncMixerUpd	= ()=> {};
	private	readonly clock		= new Clock();

	lay(hArg: HArg): boolean {
		if (! this.scene_3D) return false;

		if ('grid' in hArg) {	// 開発者用基準グリッド
			const grid = new GridHelper(
				argChk_Num(hArg, 'grid_size', 10),	// グリッド全体のサイズ
				argChk_Num(hArg, 'grid_step', 5)		// 1分割のサイズ
				// colorCenterLine：中央十字ラインの色
				// colorGrid：中央十字ライン以外の色
			);
			this.csv2pos(hArg, 'grid', grid);
			grid.name = '_grid';
			this.scene_3D.add(grid);
		}
		if ('camera' in hArg) {	// カメラ
			if (! this.camera) {
				this.camera = new PerspectiveCamera(
					argChk_Num(hArg, 'camera_fov', 50),
					CmnLib.stageW / CmnLib.stageH,
					argChk_Num(hArg, 'camera_near', 0.1),
					argChk_Num(hArg, 'camera_far', 2000)
				);
			}
			this.csv2pos(hArg, 'camera', this.camera);
		}
		if ('directional_light' in hArg) {	// 平行光源
			const light = new DirectionalLight(0xFFFFFF);
			light.intensity = argChk_Num(hArg, 'intensity', 1); // 光の強さ
			this.csv2pos(hArg, 'directional_light', light);
			light.name = '_light';
			this.scene_3D.add(light);
		}
		if ('controls' in hArg) {	// マウスドラッグで操作
			const elm = document.getElementById('skynovel');
			require('three/examples/js/controls/OrbitControls');
			const controls = new ThreeDLayer.THREE.OrbitControls(this.camera, elm);
			controls.target.set(
				this.camera.position.x + 0.15,
				this.camera.position.y,
				this.camera.position.z
			);
			// 視点操作のイージングをONにする
			controls.enableDamping = true;
			// 視点操作のイージングの値
			controls.dampingFactor = 0.2;
			// 視点変更の速さ
			controls.rotateSpeed = 0.1;
			controls.zoomSpeed = 2;

			this.fncCtrl = ()=> controls.update();	// 毎回呼ぶと慣性がつく
		}

		const type = hArg.type;
		const name = hArg.name || '';
		let mdl: Object3D = new Mesh();
		if (type) {
			if (name in this.hInf) throw `name（=${name}）が重複しています`;

			// gltfなどでは return false; で抜けるのでここで
			if (! this.running) {this.running = true; this.tick();}

			if (type == 'box') {	// 立方体サンプル
				const size = argChk_Num(hArg, 'size', 100);
				const geometry = new BoxGeometry(size, size, size);
				// new BoxGeometry(幅, 高さ, 奥行き)
				const material = new MeshNormalMaterial();
				mdl = new Mesh(geometry, material);
				mdl.rotation.z = -45;

				this.fncCtrl = ()=> {
					this.scene_3D.children.map(o=> {
						const m = o as Mesh;
						if (! m) return;

						m.rotation.x += 0.01;
						m.rotation.y += 0.01;
						m.rotation.z += 0.01;
					});
				};

				this.hInf[name] = {type: type, fn: ''};
				mdl.name = name;
				this.scene_3D.add(mdl);
				return false;
			}

			const fn = hArg.fn;
			if (! fn) throw 'fnは必須です';
			switch (type) {
				case 'celestial_sphere':	// 天球サンプル(theta画像)
				{
					const geometry = new SphereGeometry(5, 60,40);
					geometry.scale(-1, 1, 1);
					const ldr = new TextureLoader();
					if (! fn) throw 'fnがありません';
					const tx = ldr.load(ThreeDLayer.plgArg.searchPath(fn, EXT_STILL_IMG));
					tx.minFilter = LinearFilter;
					const material = new MeshBasicMaterial({map: tx});
					mdl = new Mesh(geometry, material);

					this.camera.lookAt(mdl.position);	// カメラ視野の中心座標
					this.fncCtrl = ()=> {mdl.rotation.y += 0.001};
				}
					break;

				case 'gltf':	// gltfモデル
				{
					if (! fn) throw 'fnがありません';
					const onProgress = ('debug' in hArg)
						? (xhr: {loaded: number; total: number;})=>
							console.log(`${( xhr.loaded /xhr.total *100 )}% loaded`)
						: ()=> {};
					require('three/examples/js/loaders/GLTFLoader');
					(new ThreeDLayer.THREE.GLTFLoader()).load(
						ThreeDLayer.plgArg.searchPath(fn, 'gltf|glb'),
						(gltf: any)=> {	// called when the resource is loaded
							const mdl = gltf.scene;
							mdl.name = name;
							this.scene_3D.add(mdl);
							this.hInf[name] = {type: type, fn: fn, gltf: gltf};
							this.arg2mdl(hArg, mdl);
						},
						onProgress,
						(err: any)=> console.error('An error happened', err),
					);
				}
					return false;
/*
				case 'mmd':	// MMDモデル
				{
					if (! fn) throw 'fnがありません';
					const onProgress = ()=> {};
console.log(`fn:ThreeDLayer.ts line:249 `);
					require('three/examples/js/libs/mmdparser.min');
					require('three/examples/js/loaders/MMDLoader');
// NOTE: ここで止まってる {E} (fn:main line:14) [undefined]タグ解析中例外 mes=THREE.MMDLoader: Import MMDParser
//x	(window as any).MMDParser = ThreeDLayer.THREE.MMDParser;
console.log(`fn:ThreeDLayer.ts line:250 par:${( typeof MMDParser === 'undefined' )}`);
					const loader = new ThreeDLayer.THREE.MMDLoader();
console.log(`fn:ThreeDLayer.ts line:256 `);
					loader.load(
						ThreeDLayer.plgArg.searchPath(fn, 'pmd'),
						(mdl: any)=> {
							mdl.name = name;
							this.scene_3D.add(mdl);
							this.hInf[name] = {type: type};
							this.arg2mdl(hArg, mdl);
						},
						onProgress,
						(err: any)=> console.error('An error happened', err),
					);
console.log(`fn:ThreeDLayer.ts line:268 `);
				}
					return false;
*/

/*
		if ('mmd' in hArg) {
			const mmd = searchPath(hArg['mmd'], 'pmd|pmx');
			const vmd = searchPath(hArg['vmd'], 'vmd');


	//const object = require('three/examples/js/loaders/MMDLoader').default;
	//const object2 = require('three/examples/js/loaders/MMDLoader');
	//const object2 = require('./mo');
	//const object2 = require('./three/examples/js/loaders/MMDLoader');
	console.log(`fn:ThreeDLayer.ts line:63 %o`, object2);
	const instance = new object2();
	console.log(`fn:ThreeDLayer.ts line:65 ${instance}`);
	console.log(`fn:ThreeDLayer.ts line:67 ${instance.getName()}`);

	console.log(`fn:ThreeDLayer.ts line:63 %o`, THREE);
	console.log(`fn:ThreeDLayer.ts line:63 %o`, MMDAnimationHelper);


		//	const loader = new ThreeDLayer.THREE.MMDLoader();
			const loader = new MMDLoader();
	//		const mesh = await loader.load(mmd, [vmd]);
	//		const mesh = loader.load(mmd, [vmd]);

			async function f1() {
				const mesh = await loader.load(mmd, [vmd]);
			}
			f1();


	//const helper = new ThreeDLayer.THREE.MMDHelper();
	//const helper = new MMDAnimationHelper();

			const helper = new MMDHelper();
			new MMDLoader().loadWithAnimation(
				mmd,
				vmd,
				mmd=> {
					helper.add(mmd.mesh, {
						animation	: mmd.animation,
						physics		: true,
					});
					this.scene_3D.add( mmd.mesh );
				}
			);

			const clock = new ThreeDLayer.THREE.Clock();
			const anime = ()=> {
				helper.update(clock.getDelta());
				requestAnimationFrame(anime);
			}
			anime();
*/
				case 'fbx':	//
				{
	/*				const ldrFBX = new FBXLoader();
					ldrFBX.load(searchPath(fbx, 'fbx'), obj=> {
	console.log(`fn:ThreeDLayer.ts line:76 load:%o:`, obj);
						this.scene_3D.add(obj);

						this.camera.lookAt(obj.position);	// カメラ視野の中心座標
						this.tick();
					});
	*/
				}
					break;

				case 'dae':	//
				{
		//			const dae = hArg['dae'];
		/*
					// 立方体
					const geometry = new ThreeDLayer.THREE.BoxGeometry(500, 500, 500);
					// new ThreeDLayer.THREE.BoxGeometry(幅, 高さ, 奥行き)
					const material = new ThreeDLayer.THREE.MeshNormalMaterial();
					obj = new ThreeDLayer.THREE.Mesh(geometry, material);
					obj.position.z = -500;
					obj.rotation.z = -45;
					this.scene_3D.add(obj);
		*/
		/*
					const colladaLoader = new ColladaLoader();
					colladaLoader.load(searchPath(dae, 'dae'), mdl=> {
						console.log(`fn:ThreeDLayer.ts line:147 ${mdl}`);
						this.scene_3D.add(mdl);

						this.camera.lookAt(obj.position);	// カメラ視野の中心座標
						this.tick();
					});
		*/
				}
					break;

				default:
					throw `サポートしない type=${type} です`;
			}

			this.hInf[name] = {type: type, fn: fn};
			mdl.name = name;
			this.scene_3D.add(mdl);
		}
		else if ('del' in hArg) {
			const del = hArg['del'];
			const mdl2 = this.scene_3D.children.find(e=> e.name === del);
			if (! mdl2) throw `３Ｄレイヤに存在しないモデル name=${del} です`;
			this.clearObject3D(mdl2);
			delete this.hInf[del];
			return false;
		}
		else if ('name' in hArg) {
			const mdl2 = this.scene_3D.children.find(e=> e.name === name);
			if (! mdl2) throw `３Ｄレイヤに存在しないモデル name=${name} です`;
			mdl = mdl2;
		}
		else return false;

		this.arg2mdl(hArg, mdl);

		return false;
	}
	private arg2mdl(hArg: any, o: Object3D) {
		// TODO: pos,scale,alpha トゥイーン変化欲しい
		this.csv2pos(hArg, 'pos', o);
		this.csv2scale(hArg, 'scale', o);

		const inf = this.hInf[o.name];
		if (! inf) return;

		if ('label' in hArg) {
			inf.label = hArg['label'];
			if (inf.gltf) {
				const ac: AnimationClip = AnimationClip.findByName(inf.gltf.animations, inf.label ?? '');
				if (! ac) {
					console.info(`エラーが発生しました。参考までに ${inf.fn}(glTF)内に存在するアニメ名を列挙します`);
					const a = inf.gltf.animations as AnimationClip[];
					a.map(v=> console.info(`  label=${v.name}`));
					throw `${inf.fn}(glTF)内に存在しないアニメ（label=${inf.label}）です`;
				}

				if (inf.mixer) {
					const t = argChk_Num(hArg, 'time', 1000) /1000;
					const aa = inf.mixer.clipAction(ac);
					aa.crossFadeFrom(inf.aa!, t, true);
				//	aa.crossFadeFrom(inf.aa!, t, false);
					inf.aa = aa;
				}
				else {
					inf.mixer = new AnimationMixer(o);
					inf.aa = inf.mixer!.clipAction(ac);

					this.fncMixerUpd = ()=> {
						this.scene_3D.children.map(v=> {
							const inf2 = this.hInf[v.name];
							if (inf2) inf2.mixer!.update(this.clock.getDelta());
						});
					}
				}
				inf.aa.enabled = true;
				inf.aa.clampWhenFinished = true;
					// ループしない際、終端フレームで停止しデフォルトポーズに戻さない
				inf.aa.loop = argChk_Boolean(hArg, 'loop', true)
					? LoopRepeat
					: LoopOnce;
				inf.aa.play();
			}
		}
	}
	private hInf: {[name: string]: {
		type	: string,
		fn		: string,
		label?	: string,
		gltf?	: any,
		mixer?	: AnimationMixer,
//		aa?		: THREE.AnimationAction,
		aa?		: any,	// NOTE: コンパイル通し
	}} = {};
	private csv2pos(hArg: any, name: string, o: Object3D) {
		if (! (name in hArg)) return;

		const p = String(hArg[name]).split(',').map(v => Number(v));
		o.position.set(p[0], p[1], p[2]);
	}
	private csv2scale(hArg: any, name: string, o: Object3D) {
		if (! (name in hArg)) return;

		const p = String(hArg[name]).split(',').map(v => Number(v));
		o.scale.set(p[0], p[1], p[2]);
	}
	clearLay(hArg: HArg): void {
		super.clearLay(hArg);
		if (! this.scene_3D) return;
		if (! this.running) return;

		this.running = false;
		this.fncCtrl = ()=> {};
		this.fncMixerUpd = ()=> {};
		this.hInf = {};
		this.clearScene(this.scene_3D);
		this.canvas_3D.clear();
		this.sprite_3D.texture.update();	//tell pixi that threejs changed
		delete this.camera;
	}
	private clearScene(sc: Scene) {
		sc.children.slice().map(o=> this.clearObject3D(o));
			// slice()で参照コピーしてる
	}
	private clearObject3D(o: Object3D) {
		o.parent!.remove(o);

		const s = o as Scene;
		if (s) {
			const inf = this.hInf[s.name];
			if (inf && inf.mixer) inf.mixer.stopAllAction();
			this.clearScene(s); return;
		}

		const m = o as Mesh;
		if (! m) return;
		m.geometry.dispose();
		if (m.material instanceof Material)	{
			m.material.dispose();
			if (m.material as MeshBasicMaterial) delete m.material;
		}
		else {
			m.material.map(v=> v.dispose());
		}
	}

	record = ()=> Object.assign(super.record(), {
		type	: this.type,
	});
	playback(hLay: any, fncComp: undefined | {(): void} = undefined): boolean {
		super.playback(hLay);
		if (fncComp != undefined) fncComp();
		if (! this.scene_3D) return false;

		/*switch (this.type) {	// TODO: record()とセットで作成
			case '':
				break;

			default:
				break;
		}*/

		return false;
	}

	dump(): string {
		if (! this.scene_3D) return `"is":"nothing"`;

		const aChi: string[] = [];
		this.scene_3D.children.map(o=> {
			let s = `"${o.name}": {"type":"${o.type}"`;
			const inf = this.hInf[o.name];
			if (inf && inf.mixer) s += `, "label":"${inf.label}"`;
			aChi.push(s +`}`);
		});
		return super.dump() +`, "mdl":{${aChi.join(',')}}`;
	};

}
