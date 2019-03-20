/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const Layer_1 = require('skynovel/core/lib/sn/Layer');
const Layer = Layer_1.Layer;
const CmnLib_1 = require('skynovel/core/lib/sn/CmnLib');
const CmnLib = CmnLib_1.CmnLib;

import {HArg, IPluginInitArg} from 'skynovel';

const EXT_STILL_IMG = 'png_|jpg_|jpeg_|svg_|png|jpg|jpeg|svg';

export class ThreeDLayer extends Layer {
	static	plgArg	: IPluginInitArg;
	private	static	uniq_num = 0;

	static	THREE		: any;
	private scene_3D	: THREE.Scene;
	private	canvas_3D	: THREE.CanvasRenderer;
	private sprite_3D	: PIXI.Sprite;
	private camera		: THREE.Camera;

	private fncMixerUpd	= ()=> {};
	private clock		: THREE.Clock;
	private mixer		: THREE.AnimationMixer;

	constructor() {
		super();

		if (ThreeDLayer.uniq_num++ % 2 == 1) return;

		this.scene_3D = new ThreeDLayer.THREE.Scene();
		const log = console.log;	// 「THREE.WebGLRenderer 100」を消したい
		console.log = ()=> {};
		this.canvas_3D	= new ThreeDLayer.THREE.WebGLRenderer({antialias: true, alpha: true});
		console.log = log;

		// 3D Scene canvas
		this.canvas_3D.setSize(CmnLib.stageW, CmnLib.stageH);
		this.canvas_3D.setPixelRatio(window.devicePixelRatio);

		// Map 3D canvas to 2D Canvas
		const texture_3D = PIXI.Texture.fromCanvas(this.canvas_3D.domElement);
		this.sprite_3D = new PIXI.Sprite(texture_3D);
		this.cnt.addChild(this.sprite_3D);
		this.sprite_3D.x = (CmnLib.stageW -this.sprite_3D.width) /2
		this.sprite_3D.y = (CmnLib.stageH -this.sprite_3D.height) /2
	}
	private tick = ()=> {
		this.canvas_3D.render(this.scene_3D, this.camera);
		this.sprite_3D.texture.update();	//tell pixi that threejs changed
		this.fncCtrl();
		this.fncMixerUpd();
		requestAnimationFrame(this.tick);
	}
	private fncCtrl = ()=> {};
	private isStart = false;

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
//			const mesh = await loader.load(mmd, [vmd]);
//			const mesh = loader.load(mmd, [vmd]);

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

	lay(hArg: HArg): boolean {
		if ('fbx' in hArg) {
/*			/// テスト用 Object3D
			this.camera = new ThreeDLayer.THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
			this.camera.position.set(0, 0, 700);	// カメラ位置
//			this.camera.position.set(0, 0, 0.1);	// カメラ位置

			const ldrFBX = new FBXLoader();
			ldrFBX.load(searchPath(fbx, 'fbx'), obj=> {
console.log(`fn:ThreeDLayer.ts line:76 load:%o:`, obj);
				this.scene_3D.add(obj);

				this.camera.lookAt(obj.position);	// カメラ視野の中心座標
				this.tick();
			});
*/
			return false;
		}
		else if ('dae' in hArg) {
//			const dae = hArg['dae'];
			/// テスト用 Object3D
			this.camera = new ThreeDLayer.THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
			this.camera.position.set(0, 0, 700);	// カメラ位置
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
			return false;
		}
		else if ('box' in hArg) {	// 立方体
			this.camera = new ThreeDLayer.THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
			this.camera.position.set(0, 0, 700);	// カメラ位置

			// 立方体
			const geometry = new ThreeDLayer.THREE.BoxGeometry(500, 500, 500);
			// new ThreeDLayer.THREE.BoxGeometry(幅, 高さ, 奥行き)
			const material = new ThreeDLayer.THREE.MeshNormalMaterial();
			const obj = new ThreeDLayer.THREE.Mesh(geometry, material);
			obj.position.z = -500;
			obj.rotation.z = -45;
			this.scene_3D.add(obj);

			this.fncCtrl = ()=> {
				obj.rotation.x += 0.01;
				obj.rotation.y += 0.01;
				obj.rotation.z += 0.01;
			};
		}
		else if ('gltf' in hArg) {
			// カメラ
			this.camera = new ThreeDLayer.THREE.PerspectiveCamera(45, CmnLib.stageW / CmnLib.stageH, 1, 10000);
			// PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
			//this.camera.position.set(0, 0, 0);	// カメラ位置

			const ldr = new ThreeDLayer.THREE.GLTFLoader();
			const onProgress = ('debug' in hArg)
				? (xhr: {loaded: number; total: number;})=>
					console.log(`${( xhr.loaded /xhr.total *100 )}% loaded`)
				: ()=> {};
			ldr.load(
				ThreeDLayer.plgArg.searchPath(hArg['gltf'], 'gltf|glb'),
				(gltf: any)=> {	// called when the resource is loaded
					const grid = new ThreeDLayer.THREE.GridHelper(10, 5);
						// size：グリッド全体のサイズ
						// step：1分割のサイズ
						// colorCenterLine：中央十字ラインの色
						// colorGrid：中央十字ライン以外の色
					const csv_grid = hArg['grid'] || '0,0,0';
					const g = csv_grid.split(',').map(v=>Number(v));
					grid.position.set(g[0], g[1], g[2]);
					this.scene_3D.add(grid);

					const mdl = gltf.scene;
					const csv_scale = hArg['scale'] || '0,0,0';
					const s = csv_scale.split(',').map(v=> Number(v));
					mdl.scale.set(s[0], s[1], s[2]);
					const x = CmnLib.argChk_Num(hArg, 'x', 0);
					const y = CmnLib.argChk_Num(hArg, 'y', 0);
					const z = CmnLib.argChk_Num(hArg, 'z', 0);
					mdl.position.set(x, y, z);
					this.scene_3D.add(gltf.scene);

				//	this.camera.lookAt(mdl.position);	// カメラ視野の中心座標

					const ani = hArg['ani'];
					if (! ani) return;
					const aAni: THREE.AnimationClip[] = gltf.animations;
					const idx = aAni.findIndex(v=> v.name === ani);
					if (idx == -1) throw `glTF内に存在しないアニメクリップ（ani=${ani}）です`;

					if (! this.mixer) this.mixer = new ThreeDLayer.THREE.AnimationMixer(mdl);
					const ca = this.mixer.clipAction(aAni[idx]);
					ca.play();

					if (! this.clock) this.clock = new ThreeDLayer.THREE.Clock();
					this.fncMixerUpd = ()=> this.mixer.update(this.clock.getDelta());

//					this.scene_3D.add(mdl);
/* NOTE: 終了・停止など
mixer.stopAllAction();
ca.setLoop(ThreeDLayer.THREE.LoopOnce)
ca.clampWhenFinished = true;	// アニメーションの最後のフレームで終了
*/
				},
				onProgress,
				(err: any)=> console.error('An error happened', err),
			);

			// 平行光源
			const light = new ThreeDLayer.THREE.DirectionalLight(0xFFFFFF);
//			light.intensity = 2; // 光の強さを倍に
			const csv_light = hArg['light'] || '0,0,0';
			const l = csv_light.split(',').map(v=> Number(v));
			light.position.set(l[0], l[1], l[2]);
			this.scene_3D.add(light);
		}
		else if ('celestial_sphere' in hArg) {	// 天球
			// カメラ
			this.camera = new ThreeDLayer.THREE.PerspectiveCamera(45, CmnLib.stageW / CmnLib.stageH, 1, 10000);
			// new ThreeDLayer.THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
			this.camera.position.set(0, 0, 0.1);	// カメラ位置

			// theta画像
			const geometry = new ThreeDLayer.THREE.SphereGeometry(5, 60, 40);
			geometry.scale(-1, 1, 1);
			const ldr = new ThreeDLayer.THREE.TextureLoader();
			const tx = ldr.load(ThreeDLayer.plgArg.searchPath(hArg['celestial_sphere'], EXT_STILL_IMG));
			tx.minFilter = ThreeDLayer.THREE.LinearFilter;
			const material = new ThreeDLayer.THREE.MeshBasicMaterial({map: tx});
			const obj = new ThreeDLayer.THREE.Mesh(geometry, material);
			this.scene_3D.add(obj);

			this.camera.lookAt(obj.position);	// カメラ視野の中心座標
			this.fncCtrl = ()=> {obj.rotation.y += 0.004};
		}

		if ('controls' in hArg) {
			const elm = document.getElementById('skynovel');
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
		if (! this.isStart && this.camera) {
			this.isStart = true;
			this.tick();
		}

		return false;
	}

	playback(hLay: any, fncComp: undefined | {(): void} = undefined): boolean {
		super.playback(hLay);
		if (fncComp != undefined) fncComp();
		return false;
	}
}
