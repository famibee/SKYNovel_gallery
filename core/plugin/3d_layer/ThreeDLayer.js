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
        this.tick = () => {
            this.canvas_3D.render(this.scene_3D, this.camera);
            this.sprite_3D.texture.update();
            requestAnimationFrame(this.tick);
        };
        this.isStart = false;
        this.scene_3D = new ThreeDLayer.THREE.Scene();
        const log = console.log;
        console.log = () => { };
        this.canvas_3D = new ThreeDLayer.THREE.WebGLRenderer({ antialias: true, alpha: true });
        console.log = log;
        this.canvas_3D.setSize(CmnLib.stageW, CmnLib.stageW);
        this.canvas_3D.setPixelRatio(window.devicePixelRatio);
        const texture_3D = PIXI.Texture.fromCanvas(this.canvas_3D.domElement);
        this.sprite_3D = new PIXI.Sprite(texture_3D);
        this.cnt.addChild(this.sprite_3D);
        this.sprite_3D.x = (CmnLib.stageW - this.sprite_3D.width) / 2;
        this.sprite_3D.y = (CmnLib.stageH - this.sprite_3D.height) / 2;
    }
    lay(hArg) {
        let fncCtrl = () => { };
        const dae = hArg.dae;
        const celestial_sphere = hArg.celestial_sphere;
        if ('fbx' in hArg) {
            return false;
        }
        else if (dae) {
            this.camera = new ThreeDLayer.THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
            this.camera.position.set(0, 0, 700);
            return false;
        }
        else if (celestial_sphere) {
            this.camera = new ThreeDLayer.THREE.PerspectiveCamera(45, CmnLib.stageW / CmnLib.stageH, 1, 10000);
            this.camera.position.set(0, 0, 0.1);
            const geometry = new ThreeDLayer.THREE.SphereGeometry(5, 60, 40);
            geometry.scale(-1, 1, 1);
            const ldr = new ThreeDLayer.THREE.TextureLoader();
            const tx = ldr.load(ThreeDLayer.searchPath(celestial_sphere, EXT_STILL_IMG));
            tx.minFilter = ThreeDLayer.THREE.LinearFilter;
            const material = new ThreeDLayer.THREE.MeshBasicMaterial({ map: tx });
            const obj = new ThreeDLayer.THREE.Mesh(geometry, material);
            this.scene_3D.add(obj);
            this.camera.lookAt(obj.position);
            fncCtrl = () => { obj.rotation.y += 0.004; };
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
            fncCtrl = () => {
                obj.rotation.x += 0.01;
                obj.rotation.y += 0.01;
                obj.rotation.z += 0.01;
            };
        }
        if ('controls' in hArg) {
            const controls = new ThreeDLayer.THREE.OrbitControls(this.camera);
            controls.target.set(this.camera.position.x + 0.15, this.camera.position.y, this.camera.position.z);
            controls.enableDamping = true;
            controls.dampingFactor = 0.2;
            controls.rotateSpeed = 0.1;
            controls.zoomSpeed = 2;
            fncCtrl = () => controls.update();
        }
        if (!this.isStart && this.camera) {
            this.isStart = true;
            this.tick();
            const anime = () => {
                fncCtrl();
                requestAnimationFrame(anime);
            };
            anime();
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
exports.ThreeDLayer = ThreeDLayer;
//# sourceMappingURL=ThreeDLayer.js.map