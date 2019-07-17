"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require('skynovel/core/lib/sn/Layer');
const Layer = Layer_1.Layer;
const CmnLib_1 = require('skynovel/core/lib/sn/CmnLib');
const CmnLib = CmnLib_1.CmnLib;
const three_1 = require("three");
const pixi_js_1 = require("pixi.js");
const EXT_STILL_IMG = 'png_|jpg_|jpeg_|svg_|png|jpg|jpeg|svg';
class ThreeDLayer extends Layer {
    constructor() {
        super();
        this.tick = () => {
            if (!this.running)
                return;
            this.canvas_3D.render(this.scene_3D, this.camera);
            this.sprite_3D.texture.update();
            this.fncCtrl();
            this.fncMixerUpd();
            requestAnimationFrame(this.tick);
        };
        this.running = false;
        this.fncCtrl = () => { };
        this.fncMixerUpd = () => { };
        this.clock = new ThreeDLayer.THREE.Clock();
        this.hInf = {};
        this.record = () => Object.assign(super.record(), {
            type: this.type,
        });
        if (ThreeDLayer.uniq_num++ % 2 == 1)
            return;
        this.scene_3D = new ThreeDLayer.THREE.Scene();
        const log = console.log;
        console.log = () => { };
        this.canvas_3D = new ThreeDLayer.THREE.WebGLRenderer({ antialias: true, alpha: true });
        console.log = log;
        this.canvas_3D.setSize(CmnLib.stageW, CmnLib.stageH);
        this.canvas_3D.setPixelRatio(window.devicePixelRatio);
        const texture_3D = pixi_js_1.Texture.from(this.canvas_3D.domElement);
        this.sprite_3D = new pixi_js_1.Sprite(texture_3D);
        this.cnt.addChild(this.sprite_3D);
        this.sprite_3D.x = (CmnLib.stageW - this.sprite_3D.width) / 2;
        this.sprite_3D.y = (CmnLib.stageH - this.sprite_3D.height) / 2;
    }
    lay(hArg) {
        if (!this.scene_3D)
            return false;
        if ('grid' in hArg) {
            const grid = new ThreeDLayer.THREE.GridHelper(CmnLib.argChk_Num(hArg, 'grid_size', 10), CmnLib.argChk_Num(hArg, 'grid_step', 5));
            this.csv2pos(hArg, 'grid', grid);
            grid.name = '_grid';
            this.scene_3D.add(grid);
        }
        if ('camera' in hArg) {
            if (!this.camera) {
                this.camera = new ThreeDLayer.THREE.PerspectiveCamera(CmnLib.argChk_Num(hArg, 'camera_fov', 50), CmnLib.stageW / CmnLib.stageH, CmnLib.argChk_Num(hArg, 'camera_near', 0.1), CmnLib.argChk_Num(hArg, 'camera_far', 2000));
            }
            this.csv2pos(hArg, 'camera', this.camera);
        }
        if ('directional_light' in hArg) {
            const light = new ThreeDLayer.THREE.DirectionalLight(0xFFFFFF);
            light.intensity = CmnLib.argChk_Num(hArg, 'intensity', 1);
            this.csv2pos(hArg, 'directional_light', light);
            light.name = '_light';
            this.scene_3D.add(light);
        }
        if ('controls' in hArg) {
            const elm = document.getElementById('skynovel');
            require('three/examples/js/controls/OrbitControls');
            const controls = new ThreeDLayer.THREE.OrbitControls(this.camera, elm);
            controls.target.set(this.camera.position.x + 0.15, this.camera.position.y, this.camera.position.z);
            controls.enableDamping = true;
            controls.dampingFactor = 0.2;
            controls.rotateSpeed = 0.1;
            controls.zoomSpeed = 2;
            this.fncCtrl = () => controls.update();
        }
        const type = hArg.type;
        const name = hArg.name || '';
        let mdl = new ThreeDLayer.THREE.Mesh();
        if (type) {
            if (name in this.hInf)
                throw `name（=${name}）が重複しています`;
            if (!this.running) {
                this.running = true;
                this.tick();
            }
            if (type == 'box') {
                const size = CmnLib.argChk_Num(hArg, 'size', 100);
                const geometry = new ThreeDLayer.THREE.BoxGeometry(size, size, size);
                const material = new ThreeDLayer.THREE.MeshNormalMaterial();
                mdl = new ThreeDLayer.THREE.Mesh(geometry, material);
                mdl.rotation.z = -45;
                this.fncCtrl = () => {
                    this.scene_3D.children.map(o => {
                        const m = o;
                        if (!m)
                            return;
                        m.rotation.x += 0.01;
                        m.rotation.y += 0.01;
                        m.rotation.z += 0.01;
                    });
                };
                this.hInf[name] = { type: type, fn: '' };
                mdl.name = name;
                this.scene_3D.add(mdl);
                return false;
            }
            const fn = hArg.fn;
            if (!fn)
                throw 'fnは必須です';
            switch (type) {
                case 'celestial_sphere':
                    {
                        const geometry = new ThreeDLayer.THREE.SphereGeometry(5, 60, 40);
                        geometry.scale(-1, 1, 1);
                        const ldr = new ThreeDLayer.THREE.TextureLoader();
                        if (!fn)
                            throw 'fnがありません';
                        const tx = ldr.load(ThreeDLayer.plgArg.searchPath(fn, EXT_STILL_IMG));
                        tx.minFilter = ThreeDLayer.THREE.LinearFilter;
                        const material = new ThreeDLayer.THREE.MeshBasicMaterial({ map: tx });
                        mdl = new ThreeDLayer.THREE.Mesh(geometry, material);
                        this.camera.lookAt(mdl.position);
                        this.fncCtrl = () => { mdl.rotation.y += 0.001; };
                    }
                    break;
                case 'gltf':
                    {
                        if (!fn)
                            throw 'fnがありません';
                        const onProgress = ('debug' in hArg)
                            ? (xhr) => console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`)
                            : () => { };
                        require('three/examples/js/loaders/GLTFLoader');
                        (new ThreeDLayer.THREE.GLTFLoader()).load(ThreeDLayer.plgArg.searchPath(fn, 'gltf|glb'), (gltf) => {
                            const mdl = gltf.scene;
                            mdl.name = name;
                            this.scene_3D.add(mdl);
                            this.hInf[name] = { type: type, fn: fn, gltf: gltf };
                            this.arg2mdl(hArg, mdl);
                        }, onProgress, (err) => console.error('An error happened', err));
                    }
                    return false;
                case 'fbx':
                    {
                    }
                    break;
                case 'dae':
                    {
                    }
                    break;
                default:
                    throw `サポートしない type=${type} です`;
            }
            this.hInf[name] = { type: type, fn: fn };
            mdl.name = name;
            this.scene_3D.add(mdl);
        }
        else if ('del' in hArg) {
            const del = hArg['del'];
            const mdl2 = this.scene_3D.children.find(e => e.name === del);
            if (!mdl2)
                throw `３Ｄレイヤに存在しないモデル name=${del} です`;
            this.clearObject3D(mdl2);
            delete this.hInf[del];
            return false;
        }
        else if ('name' in hArg) {
            const mdl2 = this.scene_3D.children.find(e => e.name === name);
            if (!mdl2)
                throw `３Ｄレイヤに存在しないモデル name=${name} です`;
            mdl = mdl2;
        }
        else
            return false;
        this.arg2mdl(hArg, mdl);
        return false;
    }
    arg2mdl(hArg, o) {
        this.csv2pos(hArg, 'pos', o);
        this.csv2scale(hArg, 'scale', o);
        const inf = this.hInf[o.name];
        if (!inf)
            return;
        if ('label' in hArg) {
            inf.label = hArg['label'];
            if (inf.gltf) {
                const ac = ThreeDLayer.THREE.AnimationClip.findByName(inf.gltf.animations, inf.label);
                if (!ac) {
                    console.info(`エラーが発生しました。参考までに ${inf.fn}(glTF)内に存在するアニメ名を列挙します`);
                    const a = inf.gltf.animations;
                    a.map(v => console.info(`  label=${v.name}`));
                    throw `${inf.fn}(glTF)内に存在しないアニメ（label=${inf.label}）です`;
                }
                if (inf.mixer) {
                    const t = CmnLib.argChk_Num(hArg, 'time', 1000) / 1000;
                    const aa = inf.mixer.clipAction(ac);
                    aa.crossFadeFrom(inf.aa, t, true);
                    inf.aa = aa;
                }
                else {
                    inf.mixer = new ThreeDLayer.THREE.AnimationMixer(o);
                    inf.aa = inf.mixer.clipAction(ac);
                    this.fncMixerUpd = () => {
                        this.scene_3D.children.map(v => {
                            const inf2 = this.hInf[v.name];
                            if (inf2)
                                inf2.mixer.update(this.clock.getDelta());
                        });
                    };
                }
                inf.aa.enabled = true;
                inf.aa.clampWhenFinished = true;
                inf.aa.loop = CmnLib.argChk_Boolean(hArg, 'loop', true)
                    ? ThreeDLayer.THREE.LoopRepeat
                    : ThreeDLayer.THREE.LoopOnce;
                inf.aa.play();
            }
        }
    }
    csv2pos(hArg, name, o) {
        if (!(name in hArg))
            return;
        const p = String(hArg[name]).split(',').map(v => Number(v));
        o.position.set(p[0], p[1], p[2]);
    }
    csv2scale(hArg, name, o) {
        if (!(name in hArg))
            return;
        const p = String(hArg[name]).split(',').map(v => Number(v));
        o.scale.set(p[0], p[1], p[2]);
    }
    clearLay(hArg) {
        super.clearLay(hArg);
        if (!this.scene_3D)
            return;
        if (!this.running)
            return;
        this.running = false;
        this.fncCtrl = () => { };
        this.fncMixerUpd = () => { };
        this.hInf = {};
        this.clearScene(this.scene_3D);
        this.canvas_3D.clear();
        this.sprite_3D.texture.update();
        delete this.camera;
    }
    clearScene(sc) {
        sc.children.slice().map(o => this.clearObject3D(o));
    }
    clearObject3D(o) {
        o.parent.remove(o);
        const s = o;
        if (s) {
            const inf = this.hInf[s.name];
            if (inf && inf.mixer)
                inf.mixer.stopAllAction();
            this.clearScene(s);
            return;
        }
        const m = o;
        if (!m)
            return;
        m.geometry.dispose();
        if (m.material instanceof three_1.Material) {
            m.material.dispose();
            if (m.material)
                delete m.material;
        }
        else {
            m.material.map(v => v.dispose());
        }
    }
    playback(hLay, fncComp = undefined) {
        super.playback(hLay);
        if (fncComp != undefined)
            fncComp();
        if (!this.scene_3D)
            return false;
        return false;
    }
    dump() {
        if (!this.scene_3D)
            return `"is":"nothing"`;
        const aChi = [];
        this.scene_3D.children.map(o => {
            let s = `"${o.name}": {"type":"${o.type}"`;
            const inf = this.hInf[o.name];
            if (inf && inf.mixer)
                s += `, "label":"${inf.label}"`;
            aChi.push(s + `}`);
        });
        return super.dump() + `, "mdl":{${aChi.join(',')}}`;
    }
    ;
}
ThreeDLayer.uniq_num = 0;
exports.ThreeDLayer = ThreeDLayer;
//# sourceMappingURL=ThreeDLayer.js.map