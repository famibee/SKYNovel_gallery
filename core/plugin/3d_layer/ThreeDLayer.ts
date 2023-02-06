/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2020-2023 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const {Layer, CmnLib, argChk_Num, argChk_Boolean} = require('@famibee/skynovel/web');
import {HArg, IPluginInitArg} from '@famibee/skynovel';
import {Scene, WebGLRenderer, Camera, Clock, GridHelper, PerspectiveCamera, DirectionalLight, Mesh, BoxGeometry, MeshNormalMaterial, SphereGeometry, TextureLoader, LinearFilter, MeshBasicMaterial, AnimationClip, LoopRepeat, LoopOnce, Material, Object3D, AnimationMixer, Vector3} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

import {Sprite, Texture} from 'pixi.js';
/// <reference path="./effekseer.d.ts" />

const EXT_STILL_IMG = 'png_|jpg_|jpeg_|svg_|png|jpg|jpeg|svg';

export class ThreeDLayer extends Layer {
	private	static	uniq_num = 0;

	static	THREE		: any;
	private scene_3D	: Scene;
	private	canvas_3D	: WebGLRenderer;
	private sprite_3D	: Sprite;

	private camera		: Camera;

	static	async init() {globalThis.THREE ??= await import('three');}

	constructor(private pia: IPluginInitArg) {
		super();

		if (ThreeDLayer.uniq_num++ % 2 == 1) return;

		this.scene_3D = new Scene();
		this.canvas_3D = new WebGLRenderer({antialias: true, alpha: true});

		// 3D Scene canvas
		this.canvas_3D.setSize(CmnLib.stageW, CmnLib.stageH);
		this.canvas_3D.setPixelRatio(window.devicePixelRatio);

		// Map 3D canvas to 2D Canvas
		const texture_3D = Texture.from(this.canvas_3D.domElement);
		this.sprite_3D = new Sprite(texture_3D);
		this.spLay.addChild(this.sprite_3D);
		this.sprite_3D.x = (CmnLib.stageW -this.sprite_3D.width) /2
		this.sprite_3D.y = (CmnLib.stageH -this.sprite_3D.height) /2
	}


	private tick = ()=> {
		if (! this.running) return;

		this.canvas_3D.render(this.scene_3D, this.camera);
		this.sprite_3D.texture.update();	//tell pixi that threejs changed
		this.tickUpdEff();
		this.fncCtrl();
		this.fncMixerUpd();
		requestAnimationFrame(this.tick);
	}
	private running = false;
	private fncCtrl = ()=> {};

	private fncMixerUpd	= ()=> {};
	private	readonly clock		= new Clock();

	private	ctxEff	: effekseer.EffekseerContext;
	private hEff	: any = {};
	private	tickUpdEff	= ()=> {};
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

			if ('camera_target' in hArg) {
				const [x, y, z] = String(hArg['camera_target']).split(',').map(v=> Number(v));
				this.camera.lookAt(new Vector3(x, y, z));
			}
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
			if (! elm) return false;
			const controls = new OrbitControls(this.camera, elm);
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
//		const name = (! hArg.name) ?'' :hArg.name;
	//	const name = hArg.name ?? '';	// 2020/10/20 エラーになるので
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

				this.fncCtrl = ()=> this.scene_3D.children.forEach(o=> {
					const m = o as Mesh;
					if (! m) return;

					m.rotation.x += 0.01;
					m.rotation.y += 0.01;
					m.rotation.z += 0.01;
				});

				this.hInf[name] = {type: type, fn: ''};
			}
			else {
				const fn = hArg.fn;
				if (! fn) throw 'fnは必須です';
				switch (type) {
					case 'eff':{
						// https://github.com/effekseer/EffekseerForWebGL
						const fncEff = ()=> {
							this.hEff[fn] = this.ctxEff.loadEffect(
								this.pia.searchPath(fn, 'efk'),
								argChk_Num(hArg, 'scale', 1),
	()=> {
		const [x, y, z] = String(hArg.pos || '0,0,0').split(',');
	//	const [x, y, z] = String(hArg.pos ?? '0,0,0').split(',');
			// 2020/10/20 エラーになるので
		const h = this.ctxEff.play(this.hEff[fn], parseInt(x), parseInt(y), parseInt(z));
		this.hInf[name] = {type: type, fn: fn, effhdl: h};
	},
								(m: any, url: any)=> console.error(m +' url='+ url),
							);
						};
						if (this.ctxEff) {fncEff(); break;}

						effekseer.initRuntime('./effekseer.wasm', ()=> {
							this.ctxEff = effekseer.createContext();
							this.ctxEff.init(this.canvas_3D.getContext());
							
							const clock = new Clock();
							this.tickUpdEff = ()=> {
								this.ctxEff.update(clock.getDelta() * 60.0);
								this.ctxEff.setProjectionMatrix(Float32Array.from(this.camera.projectionMatrix.elements));
								this.ctxEff.setCameraMatrix(Float32Array.from(this.camera.matrixWorldInverse.elements));
								this.ctxEff.draw();
							};
						}, ()=> {});
					}
						break;

					case 'celestial_sphere':{	// 天球サンプル(theta画像)
						const geometry = new SphereGeometry(5, 60,40);
						geometry.scale(-1, 1, 1);
						const ldr = new TextureLoader();
						if (! fn) throw 'fnがありません';
						const tx = ldr.load(this.pia.searchPath(fn, EXT_STILL_IMG));
						tx.minFilter = LinearFilter;
						const material = new MeshBasicMaterial({map: tx});
						mdl = new Mesh(geometry, material);

						this.camera.lookAt(mdl.position);	// カメラ視野の中心座標
						this.fncCtrl = ()=> {mdl.rotation.y += 0.001};
					}
						break;

					case 'gltf':{	// gltfモデル
						const onProgress = ('debug' in hArg)
							? (xhr: {loaded: number; total: number;})=>
								console.log(`${( xhr.loaded /xhr.total *100 )}% loaded`)
							: ()=> {};
						(new GLTFLoader()).load(
							this.pia.searchPath(fn, 'gltf|glb'),
							(gltf: any)=> {	// called when the resource is loaded
								const mdl = gltf.scene;
/*
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
*/
								mdl.name = name;
								this.scene_3D.add(mdl);
								this.hInf[name] = {type: type, fn: fn, gltf: gltf};
								this.arg2mdl(hArg, mdl);
							},
							onProgress,
							(e: any)=> console.error('An error happened', e),
						);
					}
						return false;	// load()で mdl セットするので

					default:
						throw `サポートしない type=${type} です`;
				}
				this.hInf[name] = {type: type, fn: fn};
			}

			mdl.name = name;
			this.scene_3D.add(mdl);
		}
		else if ('del' in hArg) {
			const del = hArg['del'];
			if (! del) return false;
			const mdl2 = this.scene_3D.children.find(e=> e.name === del);
			if (! mdl2) return false;	// エラーにしない
		//	if (! mdl2) throw `３Ｄレイヤに存在しないモデル name=${del} です`;
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
				const ac: AnimationClip = AnimationClip.findByName(inf.gltf.animations, inf.label || '');
			//	const ac: AnimationClip = AnimationClip.findByName(inf.gltf.animations, inf.label ?? '');	// 2020/10/20 エラーになるので
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
		effhdl?	: effekseer.EffekseerHandle,
		mixer?	: AnimationMixer,
//		aa?		: THREE.AnimationAction,
		aa?		: any,	// NOTE: コンパイル通し
	}} = {};
	private csv2pos(hArg: any, name: string, o: Object3D) {
		if (! (name in hArg)) return;

		const [x, y, z] = String(hArg[name]).split(',').map(v=> Number(v));
		o.position.set(x, y, z);
	}
	private csv2scale(hArg: any, name: string, o: Object3D) {
		if (! (name in hArg)) return;

		const [x, y, z] = String(hArg[name]).split(',').map(v=> Number(v));
		o.scale.set(x, y, z);
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
		//delete this.camera;
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
			if (m.material as MeshBasicMaterial) m.material = [];
		}
		else {
			m.material.map(v=> v.dispose());
		}
	}

	record = ()=> Object.assign(super.record(), {
		hInf	: this.hInf,
	});
	playback(hLay: any, aPrm: Promise<void>[]): void {
		super.playback(hLay, aPrm);
		this.hInf	= hLay.hInf;
		if (! this.scene_3D) return;

		/*switch (this.hInf.type) {	// TODO: record()とセットで作成
			case '':
				break;

			default:
				break;
		}*/
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
	}

}
