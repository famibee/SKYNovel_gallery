"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = require('three');
exports.init = (plgArg) => {
    console.log(`fn:index.ts line:13 @@@`);
    plgArg.addLayCls('3d', () => new ThreeDLayer);
    ThreeDLayer.THREE = THREE;
    window.THREE = ThreeDLayer.THREE;
    require('three/examples/js/controls/OrbitControls');
};
const skynovel_1 = require("skynovel");
class ThreeDLayer extends skynovel_1.Layer {
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
        this.canvas_3D.setSize(skynovel_1.CmnLib.stageW, skynovel_1.CmnLib.stageW);
        this.canvas_3D.setPixelRatio(window.devicePixelRatio);
        const texture_3D = PIXI.Texture.fromCanvas(this.canvas_3D.domElement);
        this.sprite_3D = new PIXI.Sprite(texture_3D);
        this.cnt.addChild(this.sprite_3D);
        this.sprite_3D.x = (skynovel_1.CmnLib.stageW - this.sprite_3D.width) / 2;
        this.sprite_3D.y = (skynovel_1.CmnLib.stageH - this.sprite_3D.height) / 2;
    }
    static init(cfg) { ThreeDLayer.cfg = cfg; }
    lay(hArg) {
        let fncCtrl = () => { };
        const dae = hArg.dae;
        const celestial_sphere = hArg.celestial_sphere;
        if ('fbx' in hArg) {
            return false;
        }
        else if (dae) {
            this.camera = new ThreeDLayer.THREE.PerspectiveCamera(75, skynovel_1.CmnLib.stageW / skynovel_1.CmnLib.stageH, 1, 10000);
            this.camera.position.set(0, 0, 700);
            return false;
        }
        else if (celestial_sphere) {
            this.camera = new ThreeDLayer.THREE.PerspectiveCamera(45, skynovel_1.CmnLib.stageW / skynovel_1.CmnLib.stageH, 1, 10000);
            this.camera.position.set(0, 0, 0.1);
            const geometry = new ThreeDLayer.THREE.SphereGeometry(5, 60, 40);
            geometry.scale(-1, 1, 1);
            const ldr = new ThreeDLayer.THREE.TextureLoader();
            const tx = ldr.load(ThreeDLayer.cfg.searchPath(celestial_sphere, 'png_|jpg_|jpeg_|png|jpg|jpeg'));
            tx.minFilter = ThreeDLayer.THREE.LinearFilter;
            const material = new ThreeDLayer.THREE.MeshBasicMaterial({ map: tx });
            const obj = new ThreeDLayer.THREE.Mesh(geometry, material);
            this.scene_3D.add(obj);
            this.camera.lookAt(obj.position);
            fncCtrl = () => { obj.rotation.y += 0.004; };
        }
        else if ('box' in hArg) {
            this.camera = new ThreeDLayer.THREE.PerspectiveCamera(75, skynovel_1.CmnLib.stageW / skynovel_1.CmnLib.stageH, 1, 10000);
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
//# sourceMappingURL=index.js.map