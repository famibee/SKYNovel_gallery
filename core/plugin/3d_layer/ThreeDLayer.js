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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ThreeDLayer_instances, _a, _ThreeDLayer_uniq_num, _ThreeDLayer_stageW, _ThreeDLayer_stageH, _ThreeDLayer_scene_3D, _ThreeDLayer_canvas_3D, _ThreeDLayer_sprite_3D, _ThreeDLayer_camera, _ThreeDLayer_tick, _ThreeDLayer_running, _ThreeDLayer_fncCtrl, _ThreeDLayer_fncMixerUpd, _ThreeDLayer_clock, _ThreeDLayer_ctxEff, _ThreeDLayer_hEff, _ThreeDLayer_tickUpdEff, _ThreeDLayer_arg2mdl, _ThreeDLayer_hInf, _ThreeDLayer_csv2pos, _ThreeDLayer_csv2scale, _ThreeDLayer_clearScene, _ThreeDLayer_clearObject3D;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeDLayer = void 0;
const { Layer, argChk_Num, argChk_Boolean } = require('@famibee/skynovel/web');
const three_1 = require("three");
const OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
const GLTFLoader_1 = require("three/examples/jsm/loaders/GLTFLoader");
const pixi_js_1 = require("pixi.js");
const EXT_STILL_IMG = 'png_|jpg_|jpeg_|svg_|png|jpg|jpeg|svg';
class ThreeDLayer extends Layer {
    static async init() { globalThis.THREE ??= await Promise.resolve().then(() => __importStar(require('three'))); }
    constructor(pia) {
        var _b, _c, _d;
        super();
        _ThreeDLayer_instances.add(this);
        this.pia = pia;
        _ThreeDLayer_scene_3D.set(this, void 0);
        _ThreeDLayer_canvas_3D.set(this, void 0);
        _ThreeDLayer_sprite_3D.set(this, void 0);
        _ThreeDLayer_camera.set(this, void 0);
        _ThreeDLayer_tick.set(this, () => {
            if (!__classPrivateFieldGet(this, _ThreeDLayer_running, "f"))
                return;
            __classPrivateFieldGet(this, _ThreeDLayer_canvas_3D, "f").render(__classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f"), __classPrivateFieldGet(this, _ThreeDLayer_camera, "f"));
            __classPrivateFieldGet(this, _ThreeDLayer_sprite_3D, "f").texture.update();
            __classPrivateFieldGet(this, _ThreeDLayer_tickUpdEff, "f").call(this);
            __classPrivateFieldGet(this, _ThreeDLayer_fncCtrl, "f").call(this);
            __classPrivateFieldGet(this, _ThreeDLayer_fncMixerUpd, "f").call(this);
            requestAnimationFrame(__classPrivateFieldGet(this, _ThreeDLayer_tick, "f"));
        });
        _ThreeDLayer_running.set(this, false);
        _ThreeDLayer_fncCtrl.set(this, () => { });
        _ThreeDLayer_fncMixerUpd.set(this, () => { });
        _ThreeDLayer_clock.set(this, new three_1.Clock());
        _ThreeDLayer_ctxEff.set(this, void 0);
        _ThreeDLayer_hEff.set(this, {});
        _ThreeDLayer_tickUpdEff.set(this, () => { });
        _ThreeDLayer_hInf.set(this, {});
        this.record = () => Object.assign(super.record(), {
            hInf: __classPrivateFieldGet(this, _ThreeDLayer_hInf, "f"),
        });
        if ((__classPrivateFieldSet(_b = ThreeDLayer, _a, (_d = __classPrivateFieldGet(_b, _a, "f", _ThreeDLayer_uniq_num), _c = _d++, _d), "f", _ThreeDLayer_uniq_num), _c) % 2 == 1)
            return;
        if (__classPrivateFieldGet(ThreeDLayer, _a, "f", _ThreeDLayer_uniq_num) === 1) {
            const { window: { width, height } } = pia.getInfo();
            __classPrivateFieldSet(ThreeDLayer, _a, width, "f", _ThreeDLayer_stageW);
            __classPrivateFieldSet(ThreeDLayer, _a, height, "f", _ThreeDLayer_stageH);
        }
        __classPrivateFieldSet(this, _ThreeDLayer_scene_3D, new three_1.Scene(), "f");
        __classPrivateFieldSet(this, _ThreeDLayer_canvas_3D, new three_1.WebGLRenderer({ antialias: true, alpha: true }), "f");
        __classPrivateFieldGet(this, _ThreeDLayer_canvas_3D, "f").setSize(__classPrivateFieldGet(ThreeDLayer, _a, "f", _ThreeDLayer_stageW), __classPrivateFieldGet(ThreeDLayer, _a, "f", _ThreeDLayer_stageH));
        __classPrivateFieldGet(this, _ThreeDLayer_canvas_3D, "f").setPixelRatio(window.devicePixelRatio);
        const texture_3D = pixi_js_1.Texture.from(__classPrivateFieldGet(this, _ThreeDLayer_canvas_3D, "f").domElement);
        __classPrivateFieldSet(this, _ThreeDLayer_sprite_3D, new pixi_js_1.Sprite(texture_3D), "f");
        this.spLay.addChild(__classPrivateFieldGet(this, _ThreeDLayer_sprite_3D, "f"));
        __classPrivateFieldGet(this, _ThreeDLayer_sprite_3D, "f").x = (__classPrivateFieldGet(ThreeDLayer, _a, "f", _ThreeDLayer_stageW) - __classPrivateFieldGet(this, _ThreeDLayer_sprite_3D, "f").width) / 2;
        __classPrivateFieldGet(this, _ThreeDLayer_sprite_3D, "f").y = (__classPrivateFieldGet(ThreeDLayer, _a, "f", _ThreeDLayer_stageH) - __classPrivateFieldGet(this, _ThreeDLayer_sprite_3D, "f").height) / 2;
    }
    lay(hArg) {
        if (!__classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f"))
            return false;
        if ('grid' in hArg) {
            const grid = new three_1.GridHelper(argChk_Num(hArg, 'grid_size', 10), argChk_Num(hArg, 'grid_step', 5));
            __classPrivateFieldGet(this, _ThreeDLayer_instances, "m", _ThreeDLayer_csv2pos).call(this, hArg, 'grid', grid);
            grid.name = '_grid';
            __classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f").add(grid);
        }
        if ('camera' in hArg) {
            if (!__classPrivateFieldGet(this, _ThreeDLayer_camera, "f")) {
                __classPrivateFieldSet(this, _ThreeDLayer_camera, new three_1.PerspectiveCamera(argChk_Num(hArg, 'camera_fov', 50), __classPrivateFieldGet(ThreeDLayer, _a, "f", _ThreeDLayer_stageW) / __classPrivateFieldGet(ThreeDLayer, _a, "f", _ThreeDLayer_stageH), argChk_Num(hArg, 'camera_near', 0.1), argChk_Num(hArg, 'camera_far', 2000)), "f");
            }
            __classPrivateFieldGet(this, _ThreeDLayer_instances, "m", _ThreeDLayer_csv2pos).call(this, hArg, 'camera', __classPrivateFieldGet(this, _ThreeDLayer_camera, "f"));
            if ('camera_target' in hArg) {
                const [x, y, z] = String(hArg['camera_target']).split(',').map(v => Number(v));
                __classPrivateFieldGet(this, _ThreeDLayer_camera, "f").lookAt(new three_1.Vector3(x, y, z));
            }
        }
        if ('directional_light' in hArg) {
            const light = new three_1.DirectionalLight(0xFFFFFF);
            light.intensity = argChk_Num(hArg, 'intensity', 1);
            __classPrivateFieldGet(this, _ThreeDLayer_instances, "m", _ThreeDLayer_csv2pos).call(this, hArg, 'directional_light', light);
            light.name = '_light';
            __classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f").add(light);
        }
        if ('controls' in hArg) {
            const elm = document.getElementById('skynovel');
            if (!elm)
                return false;
            const controls = new OrbitControls_1.OrbitControls(__classPrivateFieldGet(this, _ThreeDLayer_camera, "f"), elm);
            controls.target.set(__classPrivateFieldGet(this, _ThreeDLayer_camera, "f").position.x + 0.15, __classPrivateFieldGet(this, _ThreeDLayer_camera, "f").position.y, __classPrivateFieldGet(this, _ThreeDLayer_camera, "f").position.z);
            controls.enableDamping = true;
            controls.dampingFactor = 0.2;
            controls.rotateSpeed = 0.1;
            controls.zoomSpeed = 2;
            __classPrivateFieldSet(this, _ThreeDLayer_fncCtrl, () => controls.update(), "f");
        }
        const type = hArg.type;
        const name = hArg.name || '';
        let mdl = new three_1.Mesh();
        if (type) {
            if (name in __classPrivateFieldGet(this, _ThreeDLayer_hInf, "f"))
                throw `name（=${name}）が重複しています`;
            if (!__classPrivateFieldGet(this, _ThreeDLayer_running, "f")) {
                __classPrivateFieldSet(this, _ThreeDLayer_running, true, "f");
                __classPrivateFieldGet(this, _ThreeDLayer_tick, "f").call(this);
            }
            if (type == 'box') {
                const size = argChk_Num(hArg, 'size', 100);
                const geometry = new three_1.BoxGeometry(size, size, size);
                const material = new three_1.MeshNormalMaterial();
                mdl = new three_1.Mesh(geometry, material);
                mdl.rotation.z = -45;
                __classPrivateFieldSet(this, _ThreeDLayer_fncCtrl, () => __classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f").children.forEach(o => {
                    const m = o;
                    if (!m)
                        return;
                    m.rotation.x += 0.01;
                    m.rotation.y += 0.01;
                    m.rotation.z += 0.01;
                }), "f");
                __classPrivateFieldGet(this, _ThreeDLayer_hInf, "f")[name] = { type: type, fn: '' };
            }
            else {
                const fn = hArg.fn;
                if (!fn)
                    throw 'fnは必須です';
                switch (type) {
                    case 'eff':
                        {
                            const fncEff = () => {
                                __classPrivateFieldGet(this, _ThreeDLayer_hEff, "f")[fn] = __classPrivateFieldGet(this, _ThreeDLayer_ctxEff, "f").loadEffect(this.pia.searchPath(fn, 'efk'), argChk_Num(hArg, 'scale', 1), () => {
                                    const [x, y, z] = String(hArg.pos || '0,0,0').split(',');
                                    const h = __classPrivateFieldGet(this, _ThreeDLayer_ctxEff, "f").play(__classPrivateFieldGet(this, _ThreeDLayer_hEff, "f")[fn], parseInt(x), parseInt(y), parseInt(z));
                                    __classPrivateFieldGet(this, _ThreeDLayer_hInf, "f")[name] = { type, fn, effhdl: h };
                                }, (m, url) => console.error(m + ' url=' + url));
                            };
                            if (__classPrivateFieldGet(this, _ThreeDLayer_ctxEff, "f")) {
                                fncEff();
                                break;
                            }
                            effekseer.initRuntime('./effekseer.wasm', () => {
                                __classPrivateFieldSet(this, _ThreeDLayer_ctxEff, effekseer.createContext(), "f");
                                __classPrivateFieldGet(this, _ThreeDLayer_ctxEff, "f").init(__classPrivateFieldGet(this, _ThreeDLayer_canvas_3D, "f").getContext());
                                const clock = new three_1.Clock();
                                __classPrivateFieldSet(this, _ThreeDLayer_tickUpdEff, () => {
                                    __classPrivateFieldGet(this, _ThreeDLayer_ctxEff, "f").update(clock.getDelta() * 60.0);
                                    __classPrivateFieldGet(this, _ThreeDLayer_ctxEff, "f").setProjectionMatrix(Float32Array.from(__classPrivateFieldGet(this, _ThreeDLayer_camera, "f").projectionMatrix.elements));
                                    __classPrivateFieldGet(this, _ThreeDLayer_ctxEff, "f").setCameraMatrix(Float32Array.from(__classPrivateFieldGet(this, _ThreeDLayer_camera, "f").matrixWorldInverse.elements));
                                    __classPrivateFieldGet(this, _ThreeDLayer_ctxEff, "f").draw();
                                }, "f");
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
                            __classPrivateFieldGet(this, _ThreeDLayer_camera, "f").lookAt(mdl.position);
                            __classPrivateFieldSet(this, _ThreeDLayer_fncCtrl, () => { mdl.rotation.y += 0.001; }, "f");
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
                                __classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f").add(mdl);
                                __classPrivateFieldGet(this, _ThreeDLayer_hInf, "f")[name] = { type: type, fn: fn, gltf: gltf };
                                __classPrivateFieldGet(this, _ThreeDLayer_instances, "m", _ThreeDLayer_arg2mdl).call(this, hArg, mdl);
                            }, onProgress, (e) => console.error('An error happened', e));
                        }
                        return false;
                    default:
                        throw `サポートしない type=${type} です`;
                }
                __classPrivateFieldGet(this, _ThreeDLayer_hInf, "f")[name] = { type: type, fn: fn };
            }
            mdl.name = name;
            __classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f").add(mdl);
        }
        else if ('del' in hArg) {
            const del = hArg['del'];
            if (!del)
                return false;
            const mdl2 = __classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f").children.find(e => e.name === del);
            if (!mdl2)
                return false;
            __classPrivateFieldGet(this, _ThreeDLayer_instances, "m", _ThreeDLayer_clearObject3D).call(this, mdl2);
            delete __classPrivateFieldGet(this, _ThreeDLayer_hInf, "f")[del];
            return false;
        }
        else if ('name' in hArg) {
            const mdl2 = __classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f").children.find(e => e.name === name);
            if (!mdl2)
                throw `３Ｄレイヤに存在しないモデル name=${name} です`;
            mdl = mdl2;
        }
        else
            return false;
        __classPrivateFieldGet(this, _ThreeDLayer_instances, "m", _ThreeDLayer_arg2mdl).call(this, hArg, mdl);
        return false;
    }
    clearLay(hArg) {
        super.clearLay(hArg);
        if (!__classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f"))
            return;
        if (!__classPrivateFieldGet(this, _ThreeDLayer_running, "f"))
            return;
        __classPrivateFieldSet(this, _ThreeDLayer_running, false, "f");
        __classPrivateFieldSet(this, _ThreeDLayer_fncCtrl, () => { }, "f");
        __classPrivateFieldSet(this, _ThreeDLayer_fncMixerUpd, () => { }, "f");
        __classPrivateFieldSet(this, _ThreeDLayer_hInf, {}, "f");
        __classPrivateFieldGet(this, _ThreeDLayer_instances, "m", _ThreeDLayer_clearScene).call(this, __classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f"));
        __classPrivateFieldGet(this, _ThreeDLayer_canvas_3D, "f").clear();
        __classPrivateFieldGet(this, _ThreeDLayer_sprite_3D, "f").texture.update();
    }
    playback(hLay, aPrm) {
        super.playback(hLay, aPrm);
        __classPrivateFieldSet(this, _ThreeDLayer_hInf, hLay.hInf, "f");
        if (!__classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f"))
            return;
    }
    dump() {
        if (!__classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f"))
            return `"is":"nothing"`;
        const aChi = [];
        __classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f").children.map(o => {
            let s = `"${o.name}": {"type":"${o.type}"`;
            const inf = __classPrivateFieldGet(this, _ThreeDLayer_hInf, "f")[o.name];
            if (inf && inf.mixer)
                s += `, "label":"${inf.label}"`;
            aChi.push(s + `}`);
        });
        return super.dump() + `, "mdl":{${aChi.join(',')}}`;
    }
}
exports.ThreeDLayer = ThreeDLayer;
_a = ThreeDLayer, _ThreeDLayer_scene_3D = new WeakMap(), _ThreeDLayer_canvas_3D = new WeakMap(), _ThreeDLayer_sprite_3D = new WeakMap(), _ThreeDLayer_camera = new WeakMap(), _ThreeDLayer_tick = new WeakMap(), _ThreeDLayer_running = new WeakMap(), _ThreeDLayer_fncCtrl = new WeakMap(), _ThreeDLayer_fncMixerUpd = new WeakMap(), _ThreeDLayer_clock = new WeakMap(), _ThreeDLayer_ctxEff = new WeakMap(), _ThreeDLayer_hEff = new WeakMap(), _ThreeDLayer_tickUpdEff = new WeakMap(), _ThreeDLayer_hInf = new WeakMap(), _ThreeDLayer_instances = new WeakSet(), _ThreeDLayer_arg2mdl = function _ThreeDLayer_arg2mdl(hArg, o) {
    __classPrivateFieldGet(this, _ThreeDLayer_instances, "m", _ThreeDLayer_csv2pos).call(this, hArg, 'pos', o);
    __classPrivateFieldGet(this, _ThreeDLayer_instances, "m", _ThreeDLayer_csv2scale).call(this, hArg, 'scale', o);
    const inf = __classPrivateFieldGet(this, _ThreeDLayer_hInf, "f")[o.name];
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
                __classPrivateFieldSet(this, _ThreeDLayer_fncMixerUpd, () => {
                    __classPrivateFieldGet(this, _ThreeDLayer_scene_3D, "f").children.map(v => {
                        const inf2 = __classPrivateFieldGet(this, _ThreeDLayer_hInf, "f")[v.name];
                        if (inf2)
                            inf2.mixer.update(__classPrivateFieldGet(this, _ThreeDLayer_clock, "f").getDelta());
                    });
                }, "f");
            }
            inf.aa.enabled = true;
            inf.aa.clampWhenFinished = true;
            inf.aa.loop = argChk_Boolean(hArg, 'loop', true)
                ? three_1.LoopRepeat
                : three_1.LoopOnce;
            inf.aa.play();
        }
    }
}, _ThreeDLayer_csv2pos = function _ThreeDLayer_csv2pos(hArg, name, o) {
    if (!(name in hArg))
        return;
    const [x, y, z] = String(hArg[name]).split(',').map(v => Number(v));
    o.position.set(x, y, z);
}, _ThreeDLayer_csv2scale = function _ThreeDLayer_csv2scale(hArg, name, o) {
    if (!(name in hArg))
        return;
    const [x, y, z] = String(hArg[name]).split(',').map(v => Number(v));
    o.scale.set(x, y, z);
}, _ThreeDLayer_clearScene = function _ThreeDLayer_clearScene(sc) {
    sc.children.slice().map(o => __classPrivateFieldGet(this, _ThreeDLayer_instances, "m", _ThreeDLayer_clearObject3D).call(this, o));
}, _ThreeDLayer_clearObject3D = function _ThreeDLayer_clearObject3D(o) {
    o.parent.remove(o);
    const s = o;
    if (s) {
        const inf = __classPrivateFieldGet(this, _ThreeDLayer_hInf, "f")[s.name];
        if (inf && inf.mixer)
            inf.mixer.stopAllAction();
        __classPrivateFieldGet(this, _ThreeDLayer_instances, "m", _ThreeDLayer_clearScene).call(this, s);
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
};
_ThreeDLayer_uniq_num = { value: 0 };
_ThreeDLayer_stageW = { value: 0 };
_ThreeDLayer_stageH = { value: 0 };
//# sourceMappingURL=ThreeDLayer.js.map