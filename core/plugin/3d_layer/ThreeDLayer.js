"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeDLayer = void 0;
const { Layer, argChk_Num, argChk_Boolean } = require('@famibee/skynovel/web');
const three_1 = require("three");
const OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
const GLTFLoader_1 = require("three/examples/jsm/loaders/GLTFLoader");
const pixi_js_1 = require("pixi.js");
const EXT_STILL_IMG = 'png_|jpg_|jpeg_|svg_|png|jpg|jpeg|svg';
class ThreeDLayer extends Layer {
    pia;
    static #uniq_num = 0;
    static #stageW = 0;
    static #stageH = 0;
    static THREE;
    #scene_3D;
    #canvas_3D;
    #sprite_3D;
    #camera;
    static async init() { ThreeDLayer.THREE ??= await Promise.resolve().then(() => __importStar(require('three'))); }
    constructor(pia) {
        super();
        this.pia = pia;
        if (ThreeDLayer.#uniq_num++ % 2 == 1)
            return;
        if (ThreeDLayer.#uniq_num === 1) {
            const { window: { width, height } } = pia.getInfo();
            ThreeDLayer.#stageW = width;
            ThreeDLayer.#stageH = height;
        }
        this.#scene_3D = new three_1.Scene();
        this.#canvas_3D = new three_1.WebGLRenderer({ antialias: true, alpha: true });
        this.#canvas_3D.setSize(ThreeDLayer.#stageW, ThreeDLayer.#stageH);
        this.#canvas_3D.setPixelRatio(window.devicePixelRatio);
        const texture_3D = pixi_js_1.Texture.from(this.#canvas_3D.domElement);
        this.#sprite_3D = new pixi_js_1.Sprite(texture_3D);
        this.spLay.addChild(this.#sprite_3D);
        this.#sprite_3D.x = (ThreeDLayer.#stageW - this.#sprite_3D.width) / 2;
        this.#sprite_3D.y = (ThreeDLayer.#stageH - this.#sprite_3D.height) / 2;
    }
    #tick = () => {
        if (!this.#running)
            return;
        this.#canvas_3D.render(this.#scene_3D, this.#camera);
        this.#sprite_3D.texture.update();
        this.#tickUpdEff();
        this.#fncCtrl();
        this.#fncMixerUpd();
        requestAnimationFrame(this.#tick);
    };
    #running = false;
    #fncCtrl = () => { };
    #fncMixerUpd = () => { };
    #clock = new three_1.Clock();
    #ctxEff;
    #hEff = {};
    #tickUpdEff = () => { };
    lay(hArg) {
        if (!this.#scene_3D)
            return false;
        if ('grid' in hArg) {
            const grid = new three_1.GridHelper(argChk_Num(hArg, 'grid_size', 10), argChk_Num(hArg, 'grid_step', 5));
            this.#csv2pos(hArg, 'grid', grid);
            grid.name = '_grid';
            this.#scene_3D.add(grid);
        }
        if ('camera' in hArg) {
            if (!this.#camera) {
                this.#camera = new three_1.PerspectiveCamera(argChk_Num(hArg, 'camera_fov', 50), ThreeDLayer.#stageW / ThreeDLayer.#stageH, argChk_Num(hArg, 'camera_near', 0.1), argChk_Num(hArg, 'camera_far', 2000));
            }
            this.#csv2pos(hArg, 'camera', this.#camera);
            if ('camera_target' in hArg) {
                const [x, y, z] = String(hArg['camera_target']).split(',').map(v => Number(v));
                this.#camera.lookAt(new three_1.Vector3(x, y, z));
            }
        }
        if ('directional_light' in hArg) {
            const light = new three_1.DirectionalLight(0xFFFFFF);
            light.intensity = argChk_Num(hArg, 'intensity', 1);
            this.#csv2pos(hArg, 'directional_light', light);
            light.name = '_light';
            this.#scene_3D.add(light);
        }
        if ('controls' in hArg) {
            const elm = document.getElementById('skynovel');
            if (!elm)
                return false;
            const controls = new OrbitControls_1.OrbitControls(this.#camera, elm);
            controls.target.set(this.#camera.position.x + 0.15, this.#camera.position.y, this.#camera.position.z);
            controls.enableDamping = true;
            controls.dampingFactor = 0.2;
            controls.rotateSpeed = 0.1;
            controls.zoomSpeed = 2;
            this.#fncCtrl = () => controls.update();
        }
        const type = hArg.type;
        const name = hArg.name || '';
        let mdl = new three_1.Mesh();
        if (type) {
            if (name in this.#hInf)
                throw `name（=${name}）が重複しています`;
            if (!this.#running) {
                this.#running = true;
                this.#tick();
            }
            if (type == 'box') {
                const size = argChk_Num(hArg, 'size', 100);
                const geometry = new three_1.BoxGeometry(size, size, size);
                const material = new three_1.MeshNormalMaterial();
                mdl = new three_1.Mesh(geometry, material);
                mdl.rotation.z = -45;
                this.#fncCtrl = () => this.#scene_3D.children.forEach(o => {
                    const m = o;
                    if (!m)
                        return;
                    m.rotation.x += 0.01;
                    m.rotation.y += 0.01;
                    m.rotation.z += 0.01;
                });
                this.#hInf[name] = { type: type, fn: '' };
            }
            else {
                const fn = hArg.fn;
                if (!fn)
                    throw 'fnは必須です';
                switch (type) {
                    case 'eff':
                        {
                            const fncEff = () => {
                                this.#hEff[fn] = this.#ctxEff.loadEffect(this.pia.searchPath(fn, 'efk'), argChk_Num(hArg, 'scale', 1), () => {
                                    const [x, y, z] = String(hArg.pos || '0,0,0').split(',');
                                    const h = this.#ctxEff.play(this.#hEff[fn], parseInt(x), parseInt(y), parseInt(z));
                                    this.#hInf[name] = { type, fn, effhdl: h };
                                }, (m, url) => console.error(m + ' url=' + url));
                            };
                            if (this.#ctxEff) {
                                fncEff();
                                break;
                            }
                            effekseer.initRuntime('./effekseer.wasm', () => {
                                this.#ctxEff = effekseer.createContext();
                                this.#ctxEff.init(this.#canvas_3D.getContext());
                                const clock = new three_1.Clock();
                                this.#tickUpdEff = () => {
                                    this.#ctxEff.update(clock.getDelta() * 60.0);
                                    this.#ctxEff.setProjectionMatrix(Float32Array.from(this.#camera.projectionMatrix.elements));
                                    this.#ctxEff.setCameraMatrix(Float32Array.from(this.#camera.matrixWorldInverse.elements));
                                    this.#ctxEff.draw();
                                };
                            }, () => { });
                        }
                        break;
                    case 'celestial_sphere':
                        {
                            const geometry = new three_1.SphereGeometry(5, 60, 40);
                            geometry.scale(-1, 1, 1);
                            const ldr = new three_1.TextureLoader();
                            if (!fn)
                                throw 'fnがありません';
                            const tx = ldr.load(this.pia.searchPath(fn, EXT_STILL_IMG));
                            tx.minFilter = three_1.LinearFilter;
                            const material = new three_1.MeshBasicMaterial({ map: tx });
                            mdl = new three_1.Mesh(geometry, material);
                            this.#camera.lookAt(mdl.position);
                            this.#fncCtrl = () => { mdl.rotation.y += 0.001; };
                        }
                        break;
                    case 'gltf':
                        {
                            const onProgress = ('debug' in hArg)
                                ? (xhr) => console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`)
                                : () => { };
                            (new GLTFLoader_1.GLTFLoader()).load(this.pia.searchPath(fn, 'gltf|glb'), (gltf) => {
                                const mdl = gltf.scene;
                                mdl.name = name;
                                this.#scene_3D.add(mdl);
                                this.#hInf[name] = { type: type, fn: fn, gltf: gltf };
                                this.#arg2mdl(hArg, mdl);
                            }, onProgress, (e) => console.error('An error happened', e));
                        }
                        return false;
                    default:
                        throw `サポートしない type=${type} です`;
                }
                this.#hInf[name] = { type: type, fn: fn };
            }
            mdl.name = name;
            this.#scene_3D.add(mdl);
        }
        else if ('del' in hArg) {
            const del = hArg['del'];
            if (!del)
                return false;
            const mdl2 = this.#scene_3D.children.find(e => e.name === del);
            if (!mdl2)
                return false;
            this.#clearObject3D(mdl2);
            delete this.#hInf[del];
            return false;
        }
        else if ('name' in hArg) {
            const mdl2 = this.#scene_3D.children.find(e => e.name === name);
            if (!mdl2)
                throw `３Ｄレイヤに存在しないモデル name=${name} です`;
            mdl = mdl2;
        }
        else
            return false;
        this.#arg2mdl(hArg, mdl);
        return false;
    }
    #arg2mdl(hArg, o) {
        this.#csv2pos(hArg, 'pos', o);
        this.#csv2scale(hArg, 'scale', o);
        const inf = this.#hInf[o.name];
        if (!inf)
            return;
        if ('label' in hArg) {
            inf.label = hArg['label'];
            if (inf.gltf) {
                const ac = three_1.AnimationClip.findByName(inf.gltf.animations, inf.label || '');
                if (!ac) {
                    console.info(`エラーが発生しました。参考までに ${inf.fn}(glTF)内に存在するアニメ名を列挙します`);
                    const a = inf.gltf.animations;
                    a.map(v => console.info(`  label=${v.name}`));
                    throw `${inf.fn}(glTF)内に存在しないアニメ（label=${inf.label}）です`;
                }
                if (inf.mixer) {
                    const t = argChk_Num(hArg, 'time', 1000) / 1000;
                    const aa = inf.mixer.clipAction(ac);
                    aa.crossFadeFrom(inf.aa, t, true);
                    inf.aa = aa;
                }
                else {
                    inf.mixer = new three_1.AnimationMixer(o);
                    inf.aa = inf.mixer.clipAction(ac);
                    this.#fncMixerUpd = () => {
                        this.#scene_3D.children.map(v => {
                            const inf2 = this.#hInf[v.name];
                            if (inf2)
                                inf2.mixer.update(this.#clock.getDelta());
                        });
                    };
                }
                inf.aa.enabled = true;
                inf.aa.clampWhenFinished = true;
                inf.aa.loop = argChk_Boolean(hArg, 'loop', true)
                    ? three_1.LoopRepeat
                    : three_1.LoopOnce;
                inf.aa.play();
            }
        }
    }
    #hInf = {};
    #csv2pos(hArg, name, o) {
        if (!(name in hArg))
            return;
        const [x, y, z] = String(hArg[name]).split(',').map(v => Number(v));
        o.position.set(x, y, z);
    }
    #csv2scale(hArg, name, o) {
        if (!(name in hArg))
            return;
        const [x, y, z] = String(hArg[name]).split(',').map(v => Number(v));
        o.scale.set(x, y, z);
    }
    clearLay(hArg) {
        super.clearLay(hArg);
        if (!this.#scene_3D)
            return;
        if (!this.#running)
            return;
        this.#running = false;
        this.#fncCtrl = () => { };
        this.#fncMixerUpd = () => { };
        this.#hInf = {};
        this.#clearScene(this.#scene_3D);
        this.#canvas_3D.clear();
        this.#sprite_3D.texture.update();
    }
    #clearScene(sc) {
        sc.children.slice().map(o => this.#clearObject3D(o));
    }
    #clearObject3D(o) {
        o.parent.remove(o);
        const s = o;
        if (s) {
            const inf = this.#hInf[s.name];
            if (inf && inf.mixer)
                inf.mixer.stopAllAction();
            this.#clearScene(s);
            return;
        }
        const m = o;
        if (!m)
            return;
        m.geometry.dispose();
        if (m.material instanceof three_1.Material) {
            m.material.dispose();
            if (m.material)
                m.material = [];
        }
        else {
            m.material.map(v => v.dispose());
        }
    }
    record = () => Object.assign(super.record(), {
        hInf: this.#hInf,
    });
    playback(hLay, aPrm) {
        super.playback(hLay, aPrm);
        this.#hInf = hLay.hInf;
        if (!this.#scene_3D)
            return;
    }
    dump() {
        if (!this.#scene_3D)
            return `"is":"nothing"`;
        const aChi = [];
        this.#scene_3D.children.map(o => {
            let s = `"${o.name}": {"type":"${o.type}"`;
            const inf = this.#hInf[o.name];
            if (inf && inf.mixer)
                s += `, "label":"${inf.label}"`;
            aChi.push(s + `}`);
        });
        return super.dump() + `, "mdl":{${aChi.join(',')}}`;
    }
}
exports.ThreeDLayer = ThreeDLayer;
//# sourceMappingURL=ThreeDLayer.js.map