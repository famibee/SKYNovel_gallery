"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require('skynovel/core/lib/sn/Layer');
const Layer = Layer_1.Layer;
const CmnLib_1 = require('skynovel/core/lib/sn/CmnLib');
const CmnLib = CmnLib_1.CmnLib;
const EXT_STILL_IMG = 'png_|jpg_|jpeg_|svg_|png|jpg|jpeg|svg';
class ThreeDLayer extends Layer {
    constructor() {
        super();
        this.fncMixerUpd = () => { };
        this.tick = () => {
            this.canvas_3D.render(this.scene_3D, this.camera);
            this.sprite_3D.texture.update();
            this.fncCtrl();
            this.fncMixerUpd();
            requestAnimationFrame(this.tick);
        };
        this.fncCtrl = () => { };
        this.isStart = false;
        if (ThreeDLayer.uniq_num++ % 2 == 1)
            return;
        this.scene_3D = new ThreeDLayer.THREE.Scene();
        const log = console.log;
        console.log = () => { };
        this.canvas_3D = new ThreeDLayer.THREE.WebGLRenderer({ antialias: true, alpha: true });
        console.log = log;
        this.canvas_3D.setSize(CmnLib.stageW, CmnLib.stageH);
        this.canvas_3D.setPixelRatio(window.devicePixelRatio);
        const texture_3D = PIXI.Texture.fromCanvas(this.canvas_3D.domElement);
        this.sprite_3D = new PIXI.Sprite(texture_3D);
        this.cnt.addChild(this.sprite_3D);
        this.sprite_3D.x = (CmnLib.stageW - this.sprite_3D.width) / 2;
        this.sprite_3D.y = (CmnLib.stageH - this.sprite_3D.height) / 2;
    }
    lay(hArg) {
        if ('fbx' in hArg) {
            return false;
        }
        else if ('dae' in hArg) {
            this.camera = new ThreeDLayer.THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
            this.camera.position.set(0, 0, 700);
            return false;
        }
        else if ('box' in hArg) {
            this.camera = new ThreeDLayer.THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
            this.camera.position.set(0, 0, 700);
            const geometry = new ThreeDLayer.THREE.BoxGeometry(500, 500, 500);
            const material = new ThreeDLayer.THREE.MeshNormalMaterial();
            const obj = new ThreeDLayer.THREE.Mesh(geometry, material);
            obj.position.z = -500;
            obj.rotation.z = -45;
            this.scene_3D.add(obj);
            this.fncCtrl = () => {
                obj.rotation.x += 0.01;
                obj.rotation.y += 0.01;
                obj.rotation.z += 0.01;
            };
        }
        else if ('gltf' in hArg) {
            this.camera = new ThreeDLayer.THREE.PerspectiveCamera(45, CmnLib.stageW / CmnLib.stageH, 1, 10000);
            const ldr = new ThreeDLayer.THREE.GLTFLoader();
            const onProgress = ('debug' in hArg)
                ? (xhr) => console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`)
                : () => { };
            ldr.load(ThreeDLayer.plgArg.searchPath(hArg['gltf'], 'gltf|glb'), (gltf) => {
                const grid = new ThreeDLayer.THREE.GridHelper(10, 5);
                const csv_grid = hArg['grid'] || '0,0,0';
                const g = csv_grid.split(',').map(v => Number(v));
                grid.position.set(g[0], g[1], g[2]);
                this.scene_3D.add(grid);
                const mdl = gltf.scene;
                const csv_scale = hArg['scale'] || '0,0,0';
                const s = csv_scale.split(',').map(v => Number(v));
                mdl.scale.set(s[0], s[1], s[2]);
                const x = CmnLib.argChk_Num(hArg, 'x', 0);
                const y = CmnLib.argChk_Num(hArg, 'y', 0);
                const z = CmnLib.argChk_Num(hArg, 'z', 0);
                mdl.position.set(x, y, z);
                this.scene_3D.add(gltf.scene);
                const ani = hArg['ani'];
                if (!ani)
                    return;
                const aAni = gltf.animations;
                const idx = aAni.findIndex(v => v.name === ani);
                if (idx == -1)
                    throw `glTF内に存在しないアニメクリップ（ani=${ani}）です`;
                if (!this.mixer)
                    this.mixer = new ThreeDLayer.THREE.AnimationMixer(mdl);
                const ca = this.mixer.clipAction(aAni[idx]);
                ca.play();
                if (!this.clock)
                    this.clock = new ThreeDLayer.THREE.Clock();
                this.fncMixerUpd = () => this.mixer.update(this.clock.getDelta());
            }, onProgress, (err) => console.error('An error happened', err));
            const light = new ThreeDLayer.THREE.DirectionalLight(0xFFFFFF);
            const csv_light = hArg['light'] || '0,0,0';
            const l = csv_light.split(',').map(v => Number(v));
            light.position.set(l[0], l[1], l[2]);
            this.scene_3D.add(light);
        }
        else if ('celestial_sphere' in hArg) {
            this.camera = new ThreeDLayer.THREE.PerspectiveCamera(45, CmnLib.stageW / CmnLib.stageH, 1, 10000);
            this.camera.position.set(0, 0, 0.1);
            const geometry = new ThreeDLayer.THREE.SphereGeometry(5, 60, 40);
            geometry.scale(-1, 1, 1);
            const ldr = new ThreeDLayer.THREE.TextureLoader();
            const tx = ldr.load(ThreeDLayer.plgArg.searchPath(hArg['celestial_sphere'], EXT_STILL_IMG));
            tx.minFilter = ThreeDLayer.THREE.LinearFilter;
            const material = new ThreeDLayer.THREE.MeshBasicMaterial({ map: tx });
            const obj = new ThreeDLayer.THREE.Mesh(geometry, material);
            this.scene_3D.add(obj);
            this.camera.lookAt(obj.position);
            this.fncCtrl = () => { obj.rotation.y += 0.004; };
        }
        if ('controls' in hArg) {
            const elm = document.getElementById('skynovel');
            const controls = new ThreeDLayer.THREE.OrbitControls(this.camera, elm);
            controls.target.set(this.camera.position.x + 0.15, this.camera.position.y, this.camera.position.z);
            controls.enableDamping = true;
            controls.dampingFactor = 0.2;
            controls.rotateSpeed = 0.1;
            controls.zoomSpeed = 2;
            this.fncCtrl = () => controls.update();
        }
        if (!this.isStart && this.camera) {
            this.isStart = true;
            this.tick();
        }
        return false;
    }
    playback(hLay, fncComp = undefined) {
        super.playback(hLay);
        if (fncComp != undefined)
            fncComp();
        return false;
    }
}
ThreeDLayer.uniq_num = 0;
exports.ThreeDLayer = ThreeDLayer;
//# sourceMappingURL=ThreeDLayer.js.map