/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./core/plugin.js":
/*!************************!*\
  !*** ./core/plugin.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\"3d_layer\":0,\"cubism3_layer\":0,\"emote_layer\":0});\n\n//# sourceURL=webpack://gallery/./core/plugin.js?");

/***/ }),

/***/ "./core/plugin/3d_layer/ThreeDLayer.js":
/*!*********************************************!*\
  !*** ./core/plugin/3d_layer/ThreeDLayer.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ThreeDLayer = void 0;\nconst { Layer, argChk_Num, argChk_Boolean } = __webpack_require__(/*! @famibee/skynovel/web */ \"./node_modules/@famibee/skynovel/dist/web.js\");\nconst three_1 = __webpack_require__(/*! three */ \"./node_modules/three/build/three.cjs\");\nconst OrbitControls_1 = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\nconst GLTFLoader_1 = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ \"./node_modules/three/examples/jsm/loaders/GLTFLoader.js\");\nconst pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\");\nconst EXT_STILL_IMG = 'png_|jpg_|jpeg_|svg_|png|jpg|jpeg|svg';\nclass ThreeDLayer extends Layer {\n    pia;\n    static #uniq_num = 0;\n    static #stageW = 0;\n    static #stageH = 0;\n    static THREE;\n    #scene_3D;\n    #canvas_3D;\n    #sprite_3D;\n    #camera;\n    static async init() { ThreeDLayer.THREE ??= await Promise.resolve().then(() => __importStar(__webpack_require__(/*! three */ \"./node_modules/three/build/three.cjs\"))); }\n    constructor(pia) {\n        super();\n        this.pia = pia;\n        if (ThreeDLayer.#uniq_num++ % 2 == 1)\n            return;\n        if (ThreeDLayer.#uniq_num === 1) {\n            const { window: { width, height } } = pia.getInfo();\n            ThreeDLayer.#stageW = width;\n            ThreeDLayer.#stageH = height;\n        }\n        this.#scene_3D = new three_1.Scene();\n        this.#canvas_3D = new three_1.WebGLRenderer({ antialias: true, alpha: true });\n        this.#canvas_3D.setSize(ThreeDLayer.#stageW, ThreeDLayer.#stageH);\n        this.#canvas_3D.setPixelRatio(window.devicePixelRatio);\n        const texture_3D = pixi_js_1.Texture.from(this.#canvas_3D.domElement);\n        this.#sprite_3D = new pixi_js_1.Sprite(texture_3D);\n        this.spLay.addChild(this.#sprite_3D);\n        this.#sprite_3D.x = (ThreeDLayer.#stageW - this.#sprite_3D.width) / 2;\n        this.#sprite_3D.y = (ThreeDLayer.#stageH - this.#sprite_3D.height) / 2;\n    }\n    #tick = () => {\n        if (!this.#running)\n            return;\n        this.#canvas_3D.render(this.#scene_3D, this.#camera);\n        this.#sprite_3D.texture.update();\n        this.#tickUpdEff();\n        this.#fncCtrl();\n        this.#fncMixerUpd();\n        requestAnimationFrame(this.#tick);\n    };\n    #running = false;\n    #fncCtrl = () => { };\n    #fncMixerUpd = () => { };\n    #clock = new three_1.Clock();\n    #ctxEff;\n    #hEff = {};\n    #tickUpdEff = () => { };\n    lay(hArg) {\n        if (!this.#scene_3D)\n            return false;\n        if ('grid' in hArg) {\n            const grid = new three_1.GridHelper(argChk_Num(hArg, 'grid_size', 10), argChk_Num(hArg, 'grid_step', 5));\n            this.#csv2pos(hArg, 'grid', grid);\n            grid.name = '_grid';\n            this.#scene_3D.add(grid);\n        }\n        if ('camera' in hArg) {\n            if (!this.#camera) {\n                this.#camera = new three_1.PerspectiveCamera(argChk_Num(hArg, 'camera_fov', 50), ThreeDLayer.#stageW / ThreeDLayer.#stageH, argChk_Num(hArg, 'camera_near', 0.1), argChk_Num(hArg, 'camera_far', 2000));\n            }\n            this.#csv2pos(hArg, 'camera', this.#camera);\n            if ('camera_target' in hArg) {\n                const [x, y, z] = String(hArg['camera_target']).split(',').map(v => Number(v));\n                this.#camera.lookAt(new three_1.Vector3(x, y, z));\n            }\n        }\n        if ('directional_light' in hArg) {\n            const light = new three_1.DirectionalLight(0xFFFFFF);\n            light.intensity = argChk_Num(hArg, 'intensity', 1);\n            this.#csv2pos(hArg, 'directional_light', light);\n            light.name = '_light';\n            this.#scene_3D.add(light);\n        }\n        if ('controls' in hArg) {\n            const elm = document.getElementById('skynovel');\n            if (!elm)\n                return false;\n            const controls = new OrbitControls_1.OrbitControls(this.#camera, elm);\n            controls.target.set(this.#camera.position.x + 0.15, this.#camera.position.y, this.#camera.position.z);\n            controls.enableDamping = true;\n            controls.dampingFactor = 0.2;\n            controls.rotateSpeed = 0.1;\n            controls.zoomSpeed = 2;\n            this.#fncCtrl = () => controls.update();\n        }\n        const type = hArg.type;\n        const name = hArg.name || '';\n        let mdl = new three_1.Mesh();\n        if (type) {\n            if (name in this.#hInf)\n                throw `name（=${name}）が重複しています`;\n            if (!this.#running) {\n                this.#running = true;\n                this.#tick();\n            }\n            if (type == 'box') {\n                const size = argChk_Num(hArg, 'size', 100);\n                const geometry = new three_1.BoxGeometry(size, size, size);\n                const material = new three_1.MeshNormalMaterial();\n                mdl = new three_1.Mesh(geometry, material);\n                mdl.rotation.z = -45;\n                this.#fncCtrl = () => this.#scene_3D.children.forEach(o => {\n                    const m = o;\n                    if (!m)\n                        return;\n                    m.rotation.x += 0.01;\n                    m.rotation.y += 0.01;\n                    m.rotation.z += 0.01;\n                });\n                this.#hInf[name] = { type: type, fn: '' };\n            }\n            else {\n                const fn = hArg.fn;\n                if (!fn)\n                    throw 'fnは必須です';\n                switch (type) {\n                    case 'eff':\n                        {\n                            const fncEff = () => {\n                                this.#hEff[fn] = this.#ctxEff.loadEffect(this.pia.searchPath(fn, 'efk'), argChk_Num(hArg, 'scale', 1), () => {\n                                    const [x, y, z] = String(hArg.pos || '0,0,0').split(',');\n                                    const h = this.#ctxEff.play(this.#hEff[fn], parseInt(x), parseInt(y), parseInt(z));\n                                    this.#hInf[name] = { type, fn, effhdl: h };\n                                }, (m, url) => console.error(m + ' url=' + url));\n                            };\n                            if (this.#ctxEff) {\n                                fncEff();\n                                break;\n                            }\n                            effekseer.initRuntime('./effekseer.wasm', () => {\n                                this.#ctxEff = effekseer.createContext();\n                                this.#ctxEff.init(this.#canvas_3D.getContext());\n                                const clock = new three_1.Clock();\n                                this.#tickUpdEff = () => {\n                                    this.#ctxEff.update(clock.getDelta() * 60.0);\n                                    this.#ctxEff.setProjectionMatrix(Float32Array.from(this.#camera.projectionMatrix.elements));\n                                    this.#ctxEff.setCameraMatrix(Float32Array.from(this.#camera.matrixWorldInverse.elements));\n                                    this.#ctxEff.draw();\n                                };\n                            }, () => { });\n                        }\n                        break;\n                    case 'celestial_sphere':\n                        {\n                            const geometry = new three_1.SphereGeometry(5, 60, 40);\n                            geometry.scale(-1, 1, 1);\n                            const ldr = new three_1.TextureLoader();\n                            if (!fn)\n                                throw 'fnがありません';\n                            const tx = ldr.load(this.pia.searchPath(fn, EXT_STILL_IMG));\n                            tx.minFilter = three_1.LinearFilter;\n                            const material = new three_1.MeshBasicMaterial({ map: tx });\n                            mdl = new three_1.Mesh(geometry, material);\n                            this.#camera.lookAt(mdl.position);\n                            this.#fncCtrl = () => { mdl.rotation.y += 0.001; };\n                        }\n                        break;\n                    case 'gltf':\n                        {\n                            const onProgress = ('debug' in hArg)\n                                ? (xhr) => console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`)\n                                : () => { };\n                            (new GLTFLoader_1.GLTFLoader()).load(this.pia.searchPath(fn, 'gltf|glb'), (gltf) => {\n                                const mdl = gltf.scene;\n                                mdl.name = name;\n                                this.#scene_3D.add(mdl);\n                                this.#hInf[name] = { type: type, fn: fn, gltf: gltf };\n                                this.#arg2mdl(hArg, mdl);\n                            }, onProgress, (e) => console.error('An error happened', e));\n                        }\n                        return false;\n                    default:\n                        throw `サポートしない type=${type} です`;\n                }\n                this.#hInf[name] = { type: type, fn: fn };\n            }\n            mdl.name = name;\n            this.#scene_3D.add(mdl);\n        }\n        else if ('del' in hArg) {\n            const del = hArg['del'];\n            if (!del)\n                return false;\n            const mdl2 = this.#scene_3D.children.find(e => e.name === del);\n            if (!mdl2)\n                return false;\n            this.#clearObject3D(mdl2);\n            delete this.#hInf[del];\n            return false;\n        }\n        else if ('name' in hArg) {\n            const mdl2 = this.#scene_3D.children.find(e => e.name === name);\n            if (!mdl2)\n                throw `３Ｄレイヤに存在しないモデル name=${name} です`;\n            mdl = mdl2;\n        }\n        else\n            return false;\n        this.#arg2mdl(hArg, mdl);\n        return false;\n    }\n    #arg2mdl(hArg, o) {\n        this.#csv2pos(hArg, 'pos', o);\n        this.#csv2scale(hArg, 'scale', o);\n        const inf = this.#hInf[o.name];\n        if (!inf)\n            return;\n        if ('label' in hArg) {\n            inf.label = hArg['label'];\n            if (inf.gltf) {\n                const ac = three_1.AnimationClip.findByName(inf.gltf.animations, inf.label || '');\n                if (!ac) {\n                    console.info(`エラーが発生しました。参考までに ${inf.fn}(glTF)内に存在するアニメ名を列挙します`);\n                    const a = inf.gltf.animations;\n                    a.map(v => console.info(`  label=${v.name}`));\n                    throw `${inf.fn}(glTF)内に存在しないアニメ（label=${inf.label}）です`;\n                }\n                if (inf.mixer) {\n                    const t = argChk_Num(hArg, 'time', 1000) / 1000;\n                    const aa = inf.mixer.clipAction(ac);\n                    aa.crossFadeFrom(inf.aa, t, true);\n                    inf.aa = aa;\n                }\n                else {\n                    inf.mixer = new three_1.AnimationMixer(o);\n                    inf.aa = inf.mixer.clipAction(ac);\n                    this.#fncMixerUpd = () => {\n                        this.#scene_3D.children.map(v => {\n                            const inf2 = this.#hInf[v.name];\n                            if (inf2)\n                                inf2.mixer.update(this.#clock.getDelta());\n                        });\n                    };\n                }\n                inf.aa.enabled = true;\n                inf.aa.clampWhenFinished = true;\n                inf.aa.loop = argChk_Boolean(hArg, 'loop', true)\n                    ? three_1.LoopRepeat\n                    : three_1.LoopOnce;\n                inf.aa.play();\n            }\n        }\n    }\n    #hInf = {};\n    #csv2pos(hArg, name, o) {\n        if (!(name in hArg))\n            return;\n        const [x, y, z] = String(hArg[name]).split(',').map(v => Number(v));\n        o.position.set(x, y, z);\n    }\n    #csv2scale(hArg, name, o) {\n        if (!(name in hArg))\n            return;\n        const [x, y, z] = String(hArg[name]).split(',').map(v => Number(v));\n        o.scale.set(x, y, z);\n    }\n    clearLay(hArg) {\n        super.clearLay(hArg);\n        if (!this.#scene_3D)\n            return;\n        if (!this.#running)\n            return;\n        this.#running = false;\n        this.#fncCtrl = () => { };\n        this.#fncMixerUpd = () => { };\n        this.#hInf = {};\n        this.#clearScene(this.#scene_3D);\n        this.#canvas_3D.clear();\n        this.#sprite_3D.texture.update();\n    }\n    #clearScene(sc) {\n        sc.children.slice().map(o => this.#clearObject3D(o));\n    }\n    #clearObject3D(o) {\n        o.parent.remove(o);\n        const s = o;\n        if (s) {\n            const inf = this.#hInf[s.name];\n            if (inf && inf.mixer)\n                inf.mixer.stopAllAction();\n            this.#clearScene(s);\n            return;\n        }\n        const m = o;\n        if (!m)\n            return;\n        m.geometry.dispose();\n        if (m.material instanceof three_1.Material) {\n            m.material.dispose();\n            if (m.material)\n                m.material = [];\n        }\n        else {\n            m.material.map(v => v.dispose());\n        }\n    }\n    record = () => Object.assign(super.record(), {\n        hInf: this.#hInf,\n    });\n    playback(hLay, aPrm) {\n        super.playback(hLay, aPrm);\n        this.#hInf = hLay.hInf;\n        if (!this.#scene_3D)\n            return;\n    }\n    dump() {\n        if (!this.#scene_3D)\n            return `\"is\":\"nothing\"`;\n        const aChi = [];\n        this.#scene_3D.children.map(o => {\n            let s = `\"${o.name}\": {\"type\":\"${o.type}\"`;\n            const inf = this.#hInf[o.name];\n            if (inf && inf.mixer)\n                s += `, \"label\":\"${inf.label}\"`;\n            aChi.push(s + `}`);\n        });\n        return super.dump() + `, \"mdl\":{${aChi.join(',')}}`;\n    }\n}\nexports.ThreeDLayer = ThreeDLayer;\n//# sourceMappingURL=ThreeDLayer.js.map\n\n//# sourceURL=webpack://gallery/./core/plugin/3d_layer/ThreeDLayer.js?");

/***/ }),

/***/ "./core/plugin/3d_layer/index.js":
/*!***************************************!*\
  !*** ./core/plugin/3d_layer/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.init = init;\nconst ThreeDLayer_1 = __webpack_require__(/*! ./ThreeDLayer */ \"./core/plugin/3d_layer/ThreeDLayer.ts\");\nasync function init(pia) {\n    pia.addLayCls('3d', () => new ThreeDLayer_1.ThreeDLayer(pia));\n    return ThreeDLayer_1.ThreeDLayer.init();\n}\n;\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://gallery/./core/plugin/3d_layer/index.js?");

/***/ }),

/***/ "./core/plugin/cubism3_layer/Cubism3Layer.js":
/*!***************************************************!*\
  !*** ./core/plugin/cubism3_layer/Cubism3Layer.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Cubism3Layer = void 0;\nconst { Layer, argChk_Num } = __webpack_require__(/*! @famibee/skynovel/web */ \"./node_modules/@famibee/skynovel/dist/web.js\");\nconst pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\");\nclass Cubism3Layer extends Layer {\n    model;\n    ldr = new pixi_js_1.Loader;\n    state = {\n        fn: '',\n        label: '',\n        scale: 1,\n    };\n    lay(hArg, fncComp) {\n        super.lay(hArg);\n        const id = hArg.id || '0';\n        const fn = hArg.fn;\n        if (fn) {\n            const label = hArg.label;\n            if (!label)\n                throw `label属性でモーションjsonファイル（${fn}_(label).json）を指定して下さい`;\n            let needLoad = false;\n            ['moc', 'tex', 'mot'].map((type, i) => {\n                const rn = `l2d:${fn}_${type}`;\n                if (rn in this.ldr.resources)\n                    return;\n                if (rn in pixi_js_1.utils.TextureCache)\n                    pixi_js_1.utils.TextureCache[rn].destroy(true);\n                needLoad = true;\n                if (this.ldr.loading)\n                    this.ldr = new pixi_js_1.Loader();\n                switch (i) {\n                    case 0:\n                        this.ldr.add({\n                            name: rn,\n                            url: Cubism3Layer.pia.searchPath(fn, 'moc3_|moc3'),\n                            xhrType: pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.BUFFER,\n                        });\n                        break;\n                    case 1:\n                        this.ldr.add({\n                            name: rn,\n                            url: Cubism3Layer.pia.searchPath(fn, 'png_|png|jpg_|jpg|jpeg_|jpeg'),\n                        });\n                        break;\n                    case 2:\n                        this.ldr.add({\n                            name: rn,\n                            url: Cubism3Layer.pia.searchPath(fn + '_' + label, 'json_|json'),\n                            xhrType: pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.JSON,\n                        });\n                        break;\n                }\n            });\n            const fncLoaded = (res) => {\n                const moc = Live2DCubismCore.Moc.fromArrayBuffer(res['l2d:' + fn + '_moc'].data);\n                this.model = new LIVE2DCUBISMPIXI.ModelBuilder()\n                    .setMoc(moc)\n                    .setTimeScale(1)\n                    .addTexture(0, (res['l2d:' + fn + '_tex'] || pixi_js_1.utils.TextureCache['l2d:' + fn + '_tex']).texture)\n                    .addAnimatorLayer(id, LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE, 1)\n                    .build();\n                this.spLay.addChild(this.model);\n                const ani = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(res['l2d:' + fn + '_mot'].data);\n                this.model.animator\n                    .getLayer(id)\n                    .play(ani);\n                const tick = () => {\n                    this.hdl_tick = requestAnimationFrame(tick);\n                    if (this.model)\n                        this.model.update(1);\n                };\n                this.hdl_tick = requestAnimationFrame(tick);\n                const a = { ...hArg };\n                delete a.fn;\n                delete a.label;\n                this.state.fn = fn;\n                this.state.label = label;\n                this.lay(a, fncComp);\n                Cubism3Layer.pia.resume(fncComp);\n            };\n            if (needLoad)\n                this.ldr.load((_loader, res) => fncLoaded(res));\n            else\n                fncLoaded(this.ldr.resources);\n            return true;\n        }\n        if (!this.state.fn)\n            return false;\n        if ('label' in hArg) {\n            const label = hArg.label || '';\n            if (this.state.label != label) {\n                this.state.label = label;\n                const fn = this.state.fn;\n                const fn_mot = Cubism3Layer.pia.searchPath(fn + '_' + label, 'json_|json');\n                new pixi_js_1.Loader()\n                    .add({ name: 'l2d:' + fn + '_mot', url: fn_mot, xhrType: pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.JSON })\n                    .load((_loader, res) => {\n                    const ani = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(res['l2d:' + fn + '_mot'].data);\n                    this.model.animator\n                        .getLayer(id)\n                        .play(ani);\n                });\n            }\n        }\n        if ('scale' in hArg) {\n            this.state.scale = argChk_Num(hArg, 'scale', 1);\n            this.model.scale = new pixi_js_1.Point(this.state.scale, this.state.scale);\n            this.model.x = this.model.width / 2;\n            this.model.y = this.model.height / 2;\n        }\n        Layer.setXY(this.model, hArg, this.spLay, true);\n        return false;\n    }\n    hdl_tick = 0;\n    clearLay(hArg) {\n        super.clearLay(hArg);\n        if (this.model) {\n            cancelAnimationFrame(this.hdl_tick);\n            this.spLay.removeChild(this.model);\n            this.model = null;\n        }\n        this.state = {\n            fn: '',\n            label: '',\n            scale: 1,\n        };\n    }\n    record = () => Object.assign(super.record(), this.state);\n    playback(hLay, fncComp = undefined) {\n        super.playback(hLay);\n        return this.lay(hLay, fncComp);\n    }\n    destroy() { this.clearLay({}); }\n}\nexports.Cubism3Layer = Cubism3Layer;\n//# sourceMappingURL=Cubism3Layer.js.map\n\n//# sourceURL=webpack://gallery/./core/plugin/cubism3_layer/Cubism3Layer.js?");

/***/ }),

/***/ "./core/plugin/cubism3_layer/index.js":
/*!********************************************!*\
  !*** ./core/plugin/cubism3_layer/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.init = init;\nconst Cubism3Layer_1 = __webpack_require__(/*! ./Cubism3Layer */ \"./core/plugin/cubism3_layer/Cubism3Layer.ts\");\nasync function init(pia) {\n    pia.addLayCls('cubism3', () => new Cubism3Layer_1.Cubism3Layer);\n}\n;\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://gallery/./core/plugin/cubism3_layer/index.js?");

/***/ }),

/***/ "./core/plugin/emote_layer/EmoteLayer.js":
/*!***********************************************!*\
  !*** ./core/plugin/emote_layer/EmoteLayer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EmoteLayer = void 0;\nconst { Layer, argChk_Num } = __webpack_require__(/*! @famibee/skynovel/web */ \"./node_modules/@famibee/skynovel/dist/web.js\");\nconst pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\");\nclass EmoteLayer extends Layer {\n    pia;\n    static #uniq_num = 0;\n    static #stageW = 0;\n    static #stageH = 0;\n    #rt;\n    #cvs;\n    #sp = new pixi_js_1.Sprite;\n    #inf;\n    constructor(pia) {\n        super();\n        this.pia = pia;\n        if (EmoteLayer.#uniq_num++ % 2 === 1)\n            return;\n        if (EmoteLayer.#uniq_num === 1) {\n            const { window: { width, height } } = pia.getInfo();\n            EmoteLayer.#stageW = width;\n            EmoteLayer.#stageH = height;\n            switch (String(this.pia.getVal('const.sn.platform.os.family'))) {\n                case 'Android':\n                case 'iOS':\n                    EmotePlayer.maskMode = EmotePlayer.MaskMode.STENCIL;\n                    break;\n            }\n            EmotePlayer.createRenderCanvas(EmoteLayer.#stageW, EmoteLayer.#stageH);\n        }\n        this.#rt = pixi_js_1.RenderTexture.create({ width: EmoteLayer.#stageW, height: EmoteLayer.#stageH });\n        this.spLay.addChild(new pixi_js_1.Sprite(this.#rt));\n        this.#cvs = document.createElement('canvas');\n        this.#cvs.id = `emote:${EmoteLayer.#uniq_num}`;\n        this.#cvs.width = EmoteLayer.#stageW;\n        this.#cvs.height = EmoteLayer.#stageH;\n        this.#cvs.hidden = true;\n        const cvsSN = document.getElementById('skynovel');\n        cvsSN.parentElement.appendChild(this.#cvs);\n        this.#sp.width = EmoteLayer.#stageW;\n        this.#sp.height = EmoteLayer.#stageH;\n    }\n    lay(hArg, fncComp) {\n        if (!this.#rt)\n            return false;\n        const layer = hArg.layer;\n        if (!layer) {\n            if (hArg[':タグ名'] === 'add_lay')\n                return false;\n            throw `layerは必須です`;\n        }\n        super.lay(hArg);\n        if (hArg.fn) {\n            const fn = hArg.fn;\n            const player = new EmotePlayer(this.#cvs);\n            this.#inf = {\n                fn: fn,\n                player: player,\n            };\n            const a = { ...hArg };\n            delete a.fn;\n            a[':タグ名'] = 'lay';\n            player.onUpdate = () => {\n                if (!player)\n                    return;\n                this.#sp.texture.destroy();\n                this.#sp.texture = new pixi_js_1.Texture(new pixi_js_1.BaseTexture(this.#cvs));\n                this.pia.render(this.#sp, this.#rt, true);\n            };\n            player.promiseLoadDataFromURL(this.pia.searchPath(fn, 'emtbytes_|emtbytes'))\n                .then(() => {\n                this.lay(a, fncComp);\n                this.pia.resume(fncComp);\n            });\n            return true;\n        }\n        else if (hArg[':タグ名'] === 'add_lay')\n            return false;\n        if (!this.#inf)\n            return false;\n        Layer.setXY(this.#sp, hArg, this.spLay, true);\n        const player = this.#inf.player;\n        if (hArg.label) {\n            const a = [...player.mainTimelineLabels, ...player.diffTimelineLabels];\n            if (!a.includes(hArg.label)) {\n                console.error(`エラーが発生しました。参考までに ${this.#inf.fn}.emtbytes 内に存在するアニメ名を列挙します`);\n                a.forEach(v => console.info(`  label=${v}`));\n                throw `${this.#inf.fn}.emtbytes 内に存在しないアニメ（label=${hArg.label}）です`;\n            }\n            player.mainTimelineLabel = hArg.label;\n        }\n        if ('scale' in hArg)\n            player.scale = argChk_Num(hArg, 'scale', 1);\n        if ('grayscale' in hArg)\n            player.grayscale = argChk_Num(hArg, 'grayscale', 1);\n        if ('windSpeed' in hArg)\n            player.windSpeed = argChk_Num(hArg, 'windSpeed', 0);\n        if ('windPowerMin' in hArg)\n            player.windPowerMin = argChk_Num(hArg, 'windPowerMin', 0);\n        if ('windPowerMax' in hArg)\n            player.windPowerMax = argChk_Num(hArg, 'windPowerMax', 0);\n        return false;\n    }\n    clearLay(hArg) {\n        if (!this.#rt)\n            return;\n        super.clearLay(hArg);\n        if (!this.#inf)\n            return;\n        this.#inf.player.onUpdate = () => { };\n        this.#inf.player.unloadData();\n        this.#inf = null;\n        this.#sp.visible = false;\n        this.pia.render(this.#sp, this.#rt, true);\n        this.#sp.visible = true;\n    }\n    record = () => Object.assign(super.record(), (this.#inf)\n        ? {\n            fn: this.#inf.fn,\n            label: this.#inf.player.mainTimelineLabel,\n            scale: this.#inf.player.scale,\n            grayscale: this.#inf.player.grayscale,\n            windSpeed: this.#inf.player.windSpeed,\n            windPowerMin: this.#inf.player.windPowerMin,\n            windPowerMax: this.#inf.player.windPowerMax,\n        }\n        : { fn: '' });\n    playback(hLay, fncComp = undefined) {\n        super.playback(hLay);\n        if (hLay.fn)\n            return this.lay(hLay, fncComp);\n        this.clearLay(hLay);\n        return false;\n    }\n    dump() {\n        if (!this.#rt)\n            return `\"is\":\"nothing\"`;\n        return super.dump() + ((this.#inf)\n            ? `, \"mdl\":{\"fn\":\"${this.#inf.fn}\",\"label\":\"${this.#inf.player.mainTimelineLabel}\",\"scale\":\"${this.#inf.player.scale}\"}`\n            : `, \"mdl\":{\"fn\":\"\"}`);\n    }\n    ;\n    destroy() {\n        if (!this.#rt)\n            return;\n        this.clearLay({});\n        this.#cvs.parentElement.removeChild(this.#cvs);\n        this.spLay.removeChildren().forEach((v) => v.destroy());\n    }\n}\nexports.EmoteLayer = EmoteLayer;\n//# sourceMappingURL=EmoteLayer.js.map\n\n//# sourceURL=webpack://gallery/./core/plugin/emote_layer/EmoteLayer.js?");

/***/ }),

/***/ "./core/plugin/emote_layer/index.js":
/*!******************************************!*\
  !*** ./core/plugin/emote_layer/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.init = init;\nconst EmoteLayer_1 = __webpack_require__(/*! ./EmoteLayer */ \"./core/plugin/emote_layer/EmoteLayer.ts\");\nasync function init(pia) {\n    pia.addLayCls('emote', () => new EmoteLayer_1.EmoteLayer(pia));\n}\n;\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://gallery/./core/plugin/emote_layer/index.js?");

/***/ }),

/***/ "./core/plugin sync recursive ^\\.\\/.*$":
/*!************************************!*\
  !*** ./core/plugin/ sync ^\.\/.*$ ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./3d_layer\": \"./core/plugin/3d_layer/index.ts\",\n\t\"./3d_layer/\": \"./core/plugin/3d_layer/index.ts\",\n\t\"./3d_layer/ThreeDLayer\": \"./core/plugin/3d_layer/ThreeDLayer.ts\",\n\t\"./3d_layer/ThreeDLayer.js\": \"./core/plugin/3d_layer/ThreeDLayer.js\",\n\t\"./3d_layer/ThreeDLayer.js.map\": \"./core/plugin/3d_layer/ThreeDLayer.js.map\",\n\t\"./3d_layer/ThreeDLayer.ts\": \"./core/plugin/3d_layer/ThreeDLayer.ts\",\n\t\"./3d_layer/effekseer.d\": \"./core/plugin/3d_layer/effekseer.d.ts\",\n\t\"./3d_layer/effekseer.d.ts\": \"./core/plugin/3d_layer/effekseer.d.ts\",\n\t\"./3d_layer/index\": \"./core/plugin/3d_layer/index.ts\",\n\t\"./3d_layer/index.d\": \"./core/plugin/3d_layer/index.d.ts\",\n\t\"./3d_layer/index.d.ts\": \"./core/plugin/3d_layer/index.d.ts\",\n\t\"./3d_layer/index.d.ts.map\": \"./core/plugin/3d_layer/index.d.ts.map\",\n\t\"./3d_layer/index.js\": \"./core/plugin/3d_layer/index.js\",\n\t\"./3d_layer/index.js.map\": \"./core/plugin/3d_layer/index.js.map\",\n\t\"./3d_layer/index.ts\": \"./core/plugin/3d_layer/index.ts\",\n\t\"./cubism3_layer\": \"./core/plugin/cubism3_layer/index.ts\",\n\t\"./cubism3_layer/\": \"./core/plugin/cubism3_layer/index.ts\",\n\t\"./cubism3_layer/Cubism3Layer\": \"./core/plugin/cubism3_layer/Cubism3Layer.ts\",\n\t\"./cubism3_layer/Cubism3Layer.js\": \"./core/plugin/cubism3_layer/Cubism3Layer.js\",\n\t\"./cubism3_layer/Cubism3Layer.js.map\": \"./core/plugin/cubism3_layer/Cubism3Layer.js.map\",\n\t\"./cubism3_layer/Cubism3Layer.ts\": \"./core/plugin/cubism3_layer/Cubism3Layer.ts\",\n\t\"./cubism3_layer/index\": \"./core/plugin/cubism3_layer/index.ts\",\n\t\"./cubism3_layer/index.d\": \"./core/plugin/cubism3_layer/index.d.ts\",\n\t\"./cubism3_layer/index.d.ts\": \"./core/plugin/cubism3_layer/index.d.ts\",\n\t\"./cubism3_layer/index.d.ts.map\": \"./core/plugin/cubism3_layer/index.d.ts.map\",\n\t\"./cubism3_layer/index.js\": \"./core/plugin/cubism3_layer/index.js\",\n\t\"./cubism3_layer/index.js.map\": \"./core/plugin/cubism3_layer/index.js.map\",\n\t\"./cubism3_layer/index.ts\": \"./core/plugin/cubism3_layer/index.ts\",\n\t\"./emote_layer\": \"./core/plugin/emote_layer/index.ts\",\n\t\"./emote_layer/\": \"./core/plugin/emote_layer/index.ts\",\n\t\"./emote_layer/EmoteLayer\": \"./core/plugin/emote_layer/EmoteLayer.ts\",\n\t\"./emote_layer/EmoteLayer.js\": \"./core/plugin/emote_layer/EmoteLayer.js\",\n\t\"./emote_layer/EmoteLayer.js.map\": \"./core/plugin/emote_layer/EmoteLayer.js.map\",\n\t\"./emote_layer/EmoteLayer.ts\": \"./core/plugin/emote_layer/EmoteLayer.ts\",\n\t\"./emote_layer/index\": \"./core/plugin/emote_layer/index.ts\",\n\t\"./emote_layer/index.d\": \"./core/plugin/emote_layer/index.d.ts\",\n\t\"./emote_layer/index.d.ts\": \"./core/plugin/emote_layer/index.d.ts\",\n\t\"./emote_layer/index.d.ts.map\": \"./core/plugin/emote_layer/index.d.ts.map\",\n\t\"./emote_layer/index.js\": \"./core/plugin/emote_layer/index.js\",\n\t\"./emote_layer/index.js.map\": \"./core/plugin/emote_layer/index.js.map\",\n\t\"./emote_layer/index.ts\": \"./core/plugin/emote_layer/index.ts\",\n\t\"./emote_layer/最初にお読み下さい.txt\": \"./core/plugin/emote_layer/最初にお読み下さい.txt\",\n\t\"./pass\": \"./core/plugin/pass.json\",\n\t\"./pass.json\": \"./core/plugin/pass.json\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./core/plugin sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack://gallery/./core/plugin/_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./core/web4webpack.js":
/*!*****************************!*\
  !*** ./core/web4webpack.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plugin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugin.js */ \"./core/plugin.js\");\n/* harmony import */ var _famibee_skynovel_web__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @famibee/skynovel/web */ \"./node_modules/@famibee/skynovel/dist/web.js\");\n\nObject.defineProperty(__webpack_exports__, \"__esModule\", ({ value: true }));\n// 変更後は「npm run webpack:dev」\n\nconst hPlg = {};\n\nfor (const nm in _plugin_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) hPlg[nm] = __webpack_require__(\"./core/plugin sync recursive ^\\\\.\\\\/.*$\")(`./${nm}`);\n\nconst dip = {'expanding': false};\nlet pcur = 'prj/';\nif (location.pathname.slice(-15) == '/index_app.html') {\n\tpcur = '';\n\tdip['oninit_run'] = false;\n}\n\nconst sys = new _famibee_skynovel_web__WEBPACK_IMPORTED_MODULE_1__.SysWeb(hPlg, {cur: pcur +'top/', dip: JSON.stringify(dip)});\nglobalThis.runSN = (cur = pcur +'top')=> sys.runSN(cur);\nglobalThis.stopSN = ()=> sys.stop();\n\n\n//# sourceURL=webpack://gallery/./core/web4webpack.js?");

/***/ }),

/***/ "./core/plugin/3d_layer/ThreeDLayer.js.map":
/*!*************************************************!*\
  !*** ./core/plugin/3d_layer/ThreeDLayer.js.map ***!
  \*************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/3d_layer/ThreeDLayer.js.map?");

/***/ }),

/***/ "./core/plugin/3d_layer/effekseer.d.ts":
/*!*********************************************!*\
  !*** ./core/plugin/3d_layer/effekseer.d.ts ***!
  \*********************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/3d_layer/effekseer.d.ts?");

/***/ }),

/***/ "./core/plugin/3d_layer/index.d.ts":
/*!*****************************************!*\
  !*** ./core/plugin/3d_layer/index.d.ts ***!
  \*****************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/3d_layer/index.d.ts?");

/***/ }),

/***/ "./core/plugin/3d_layer/index.d.ts.map":
/*!*********************************************!*\
  !*** ./core/plugin/3d_layer/index.d.ts.map ***!
  \*********************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/3d_layer/index.d.ts.map?");

/***/ }),

/***/ "./core/plugin/3d_layer/index.js.map":
/*!*******************************************!*\
  !*** ./core/plugin/3d_layer/index.js.map ***!
  \*******************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/3d_layer/index.js.map?");

/***/ }),

/***/ "./core/plugin/cubism3_layer/Cubism3Layer.js.map":
/*!*******************************************************!*\
  !*** ./core/plugin/cubism3_layer/Cubism3Layer.js.map ***!
  \*******************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/cubism3_layer/Cubism3Layer.js.map?");

/***/ }),

/***/ "./core/plugin/cubism3_layer/index.d.ts":
/*!**********************************************!*\
  !*** ./core/plugin/cubism3_layer/index.d.ts ***!
  \**********************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/cubism3_layer/index.d.ts?");

/***/ }),

/***/ "./core/plugin/cubism3_layer/index.d.ts.map":
/*!**************************************************!*\
  !*** ./core/plugin/cubism3_layer/index.d.ts.map ***!
  \**************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/cubism3_layer/index.d.ts.map?");

/***/ }),

/***/ "./core/plugin/cubism3_layer/index.js.map":
/*!************************************************!*\
  !*** ./core/plugin/cubism3_layer/index.js.map ***!
  \************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/cubism3_layer/index.js.map?");

/***/ }),

/***/ "./core/plugin/emote_layer/EmoteLayer.js.map":
/*!***************************************************!*\
  !*** ./core/plugin/emote_layer/EmoteLayer.js.map ***!
  \***************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/emote_layer/EmoteLayer.js.map?");

/***/ }),

/***/ "./core/plugin/emote_layer/index.d.ts":
/*!********************************************!*\
  !*** ./core/plugin/emote_layer/index.d.ts ***!
  \********************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/emote_layer/index.d.ts?");

/***/ }),

/***/ "./core/plugin/emote_layer/index.d.ts.map":
/*!************************************************!*\
  !*** ./core/plugin/emote_layer/index.d.ts.map ***!
  \************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/emote_layer/index.d.ts.map?");

/***/ }),

/***/ "./core/plugin/emote_layer/index.js.map":
/*!**********************************************!*\
  !*** ./core/plugin/emote_layer/index.js.map ***!
  \**********************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/emote_layer/index.js.map?");

/***/ }),

/***/ "./core/plugin/emote_layer/最初にお読み下さい.txt":
/*!***********************************************!*\
  !*** ./core/plugin/emote_layer/最初にお読み下さい.txt ***!
  \***********************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://gallery/./core/plugin/emote_layer/%E6%9C%80%E5%88%9D%E3%81%AB%E3%81%8A%E8%AA%AD%E3%81%BF%E4%B8%8B%E3%81%95%E3%81%84.txt?");

/***/ }),

/***/ "./core/plugin/3d_layer/ThreeDLayer.ts":
/*!*********************************************!*\
  !*** ./core/plugin/3d_layer/ThreeDLayer.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ThreeDLayer = void 0;\nconst { Layer, argChk_Num, argChk_Boolean } = __webpack_require__(/*! @famibee/skynovel/web */ \"./node_modules/@famibee/skynovel/dist/web.js\");\nconst three_1 = __webpack_require__(/*! three */ \"./node_modules/three/build/three.cjs\");\nconst OrbitControls_1 = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\nconst GLTFLoader_1 = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ \"./node_modules/three/examples/jsm/loaders/GLTFLoader.js\");\nconst pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\");\nconst EXT_STILL_IMG = 'png_|jpg_|jpeg_|svg_|png|jpg|jpeg|svg';\nclass ThreeDLayer extends Layer {\n    pia;\n    static #uniq_num = 0;\n    static #stageW = 0;\n    static #stageH = 0;\n    static THREE;\n    #scene_3D;\n    #canvas_3D;\n    #sprite_3D;\n    #camera;\n    static async init() { ThreeDLayer.THREE ??= await Promise.resolve().then(() => __importStar(__webpack_require__(/*! three */ \"./node_modules/three/build/three.cjs\"))); }\n    constructor(pia) {\n        super();\n        this.pia = pia;\n        if (ThreeDLayer.#uniq_num++ % 2 == 1)\n            return;\n        if (ThreeDLayer.#uniq_num === 1) {\n            const { window: { width, height } } = pia.getInfo();\n            ThreeDLayer.#stageW = width;\n            ThreeDLayer.#stageH = height;\n        }\n        this.#scene_3D = new three_1.Scene();\n        this.#canvas_3D = new three_1.WebGLRenderer({ antialias: true, alpha: true });\n        this.#canvas_3D.setSize(ThreeDLayer.#stageW, ThreeDLayer.#stageH);\n        this.#canvas_3D.setPixelRatio(window.devicePixelRatio);\n        const texture_3D = pixi_js_1.Texture.from(this.#canvas_3D.domElement);\n        this.#sprite_3D = new pixi_js_1.Sprite(texture_3D);\n        this.spLay.addChild(this.#sprite_3D);\n        this.#sprite_3D.x = (ThreeDLayer.#stageW - this.#sprite_3D.width) / 2;\n        this.#sprite_3D.y = (ThreeDLayer.#stageH - this.#sprite_3D.height) / 2;\n    }\n    #tick = () => {\n        if (!this.#running)\n            return;\n        this.#canvas_3D.render(this.#scene_3D, this.#camera);\n        this.#sprite_3D.texture.update();\n        this.#tickUpdEff();\n        this.#fncCtrl();\n        this.#fncMixerUpd();\n        requestAnimationFrame(this.#tick);\n    };\n    #running = false;\n    #fncCtrl = () => { };\n    #fncMixerUpd = () => { };\n    #clock = new three_1.Clock();\n    #ctxEff;\n    #hEff = {};\n    #tickUpdEff = () => { };\n    lay(hArg) {\n        if (!this.#scene_3D)\n            return false;\n        if ('grid' in hArg) {\n            const grid = new three_1.GridHelper(argChk_Num(hArg, 'grid_size', 10), argChk_Num(hArg, 'grid_step', 5));\n            this.#csv2pos(hArg, 'grid', grid);\n            grid.name = '_grid';\n            this.#scene_3D.add(grid);\n        }\n        if ('camera' in hArg) {\n            if (!this.#camera) {\n                this.#camera = new three_1.PerspectiveCamera(argChk_Num(hArg, 'camera_fov', 50), ThreeDLayer.#stageW / ThreeDLayer.#stageH, argChk_Num(hArg, 'camera_near', 0.1), argChk_Num(hArg, 'camera_far', 2000));\n            }\n            this.#csv2pos(hArg, 'camera', this.#camera);\n            if ('camera_target' in hArg) {\n                const [x, y, z] = String(hArg['camera_target']).split(',').map(v => Number(v));\n                this.#camera.lookAt(new three_1.Vector3(x, y, z));\n            }\n        }\n        if ('directional_light' in hArg) {\n            const light = new three_1.DirectionalLight(0xFFFFFF);\n            light.intensity = argChk_Num(hArg, 'intensity', 1);\n            this.#csv2pos(hArg, 'directional_light', light);\n            light.name = '_light';\n            this.#scene_3D.add(light);\n        }\n        if ('controls' in hArg) {\n            const elm = document.getElementById('skynovel');\n            if (!elm)\n                return false;\n            const controls = new OrbitControls_1.OrbitControls(this.#camera, elm);\n            controls.target.set(this.#camera.position.x + 0.15, this.#camera.position.y, this.#camera.position.z);\n            controls.enableDamping = true;\n            controls.dampingFactor = 0.2;\n            controls.rotateSpeed = 0.1;\n            controls.zoomSpeed = 2;\n            this.#fncCtrl = () => controls.update();\n        }\n        const type = hArg.type;\n        const name = hArg.name || '';\n        let mdl = new three_1.Mesh();\n        if (type) {\n            if (name in this.#hInf)\n                throw `name（=${name}）が重複しています`;\n            if (!this.#running) {\n                this.#running = true;\n                this.#tick();\n            }\n            if (type == 'box') {\n                const size = argChk_Num(hArg, 'size', 100);\n                const geometry = new three_1.BoxGeometry(size, size, size);\n                const material = new three_1.MeshNormalMaterial();\n                mdl = new three_1.Mesh(geometry, material);\n                mdl.rotation.z = -45;\n                this.#fncCtrl = () => this.#scene_3D.children.forEach(o => {\n                    const m = o;\n                    if (!m)\n                        return;\n                    m.rotation.x += 0.01;\n                    m.rotation.y += 0.01;\n                    m.rotation.z += 0.01;\n                });\n                this.#hInf[name] = { type: type, fn: '' };\n            }\n            else {\n                const fn = hArg.fn;\n                if (!fn)\n                    throw 'fnは必須です';\n                switch (type) {\n                    case 'eff':\n                        {\n                            const fncEff = () => {\n                                this.#hEff[fn] = this.#ctxEff.loadEffect(this.pia.searchPath(fn, 'efk'), argChk_Num(hArg, 'scale', 1), () => {\n                                    const [x, y, z] = String(hArg.pos || '0,0,0').split(',');\n                                    const h = this.#ctxEff.play(this.#hEff[fn], parseInt(x), parseInt(y), parseInt(z));\n                                    this.#hInf[name] = { type, fn, effhdl: h };\n                                }, (m, url) => console.error(m + ' url=' + url));\n                            };\n                            if (this.#ctxEff) {\n                                fncEff();\n                                break;\n                            }\n                            effekseer.initRuntime('./effekseer.wasm', () => {\n                                this.#ctxEff = effekseer.createContext();\n                                this.#ctxEff.init(this.#canvas_3D.getContext());\n                                const clock = new three_1.Clock();\n                                this.#tickUpdEff = () => {\n                                    this.#ctxEff.update(clock.getDelta() * 60.0);\n                                    this.#ctxEff.setProjectionMatrix(Float32Array.from(this.#camera.projectionMatrix.elements));\n                                    this.#ctxEff.setCameraMatrix(Float32Array.from(this.#camera.matrixWorldInverse.elements));\n                                    this.#ctxEff.draw();\n                                };\n                            }, () => { });\n                        }\n                        break;\n                    case 'celestial_sphere':\n                        {\n                            const geometry = new three_1.SphereGeometry(5, 60, 40);\n                            geometry.scale(-1, 1, 1);\n                            const ldr = new three_1.TextureLoader();\n                            if (!fn)\n                                throw 'fnがありません';\n                            const tx = ldr.load(this.pia.searchPath(fn, EXT_STILL_IMG));\n                            tx.minFilter = three_1.LinearFilter;\n                            const material = new three_1.MeshBasicMaterial({ map: tx });\n                            mdl = new three_1.Mesh(geometry, material);\n                            this.#camera.lookAt(mdl.position);\n                            this.#fncCtrl = () => { mdl.rotation.y += 0.001; };\n                        }\n                        break;\n                    case 'gltf':\n                        {\n                            const onProgress = ('debug' in hArg)\n                                ? (xhr) => console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`)\n                                : () => { };\n                            (new GLTFLoader_1.GLTFLoader()).load(this.pia.searchPath(fn, 'gltf|glb'), (gltf) => {\n                                const mdl = gltf.scene;\n                                mdl.name = name;\n                                this.#scene_3D.add(mdl);\n                                this.#hInf[name] = { type: type, fn: fn, gltf: gltf };\n                                this.#arg2mdl(hArg, mdl);\n                            }, onProgress, (e) => console.error('An error happened', e));\n                        }\n                        return false;\n                    default:\n                        throw `サポートしない type=${type} です`;\n                }\n                this.#hInf[name] = { type: type, fn: fn };\n            }\n            mdl.name = name;\n            this.#scene_3D.add(mdl);\n        }\n        else if ('del' in hArg) {\n            const del = hArg['del'];\n            if (!del)\n                return false;\n            const mdl2 = this.#scene_3D.children.find(e => e.name === del);\n            if (!mdl2)\n                return false;\n            this.#clearObject3D(mdl2);\n            delete this.#hInf[del];\n            return false;\n        }\n        else if ('name' in hArg) {\n            const mdl2 = this.#scene_3D.children.find(e => e.name === name);\n            if (!mdl2)\n                throw `３Ｄレイヤに存在しないモデル name=${name} です`;\n            mdl = mdl2;\n        }\n        else\n            return false;\n        this.#arg2mdl(hArg, mdl);\n        return false;\n    }\n    #arg2mdl(hArg, o) {\n        this.#csv2pos(hArg, 'pos', o);\n        this.#csv2scale(hArg, 'scale', o);\n        const inf = this.#hInf[o.name];\n        if (!inf)\n            return;\n        if ('label' in hArg) {\n            inf.label = hArg['label'];\n            if (inf.gltf) {\n                const ac = three_1.AnimationClip.findByName(inf.gltf.animations, inf.label || '');\n                if (!ac) {\n                    console.info(`エラーが発生しました。参考までに ${inf.fn}(glTF)内に存在するアニメ名を列挙します`);\n                    const a = inf.gltf.animations;\n                    a.map(v => console.info(`  label=${v.name}`));\n                    throw `${inf.fn}(glTF)内に存在しないアニメ（label=${inf.label}）です`;\n                }\n                if (inf.mixer) {\n                    const t = argChk_Num(hArg, 'time', 1000) / 1000;\n                    const aa = inf.mixer.clipAction(ac);\n                    aa.crossFadeFrom(inf.aa, t, true);\n                    inf.aa = aa;\n                }\n                else {\n                    inf.mixer = new three_1.AnimationMixer(o);\n                    inf.aa = inf.mixer.clipAction(ac);\n                    this.#fncMixerUpd = () => {\n                        this.#scene_3D.children.map(v => {\n                            const inf2 = this.#hInf[v.name];\n                            if (inf2)\n                                inf2.mixer.update(this.#clock.getDelta());\n                        });\n                    };\n                }\n                inf.aa.enabled = true;\n                inf.aa.clampWhenFinished = true;\n                inf.aa.loop = argChk_Boolean(hArg, 'loop', true)\n                    ? three_1.LoopRepeat\n                    : three_1.LoopOnce;\n                inf.aa.play();\n            }\n        }\n    }\n    #hInf = {};\n    #csv2pos(hArg, name, o) {\n        if (!(name in hArg))\n            return;\n        const [x, y, z] = String(hArg[name]).split(',').map(v => Number(v));\n        o.position.set(x, y, z);\n    }\n    #csv2scale(hArg, name, o) {\n        if (!(name in hArg))\n            return;\n        const [x, y, z] = String(hArg[name]).split(',').map(v => Number(v));\n        o.scale.set(x, y, z);\n    }\n    clearLay(hArg) {\n        super.clearLay(hArg);\n        if (!this.#scene_3D)\n            return;\n        if (!this.#running)\n            return;\n        this.#running = false;\n        this.#fncCtrl = () => { };\n        this.#fncMixerUpd = () => { };\n        this.#hInf = {};\n        this.#clearScene(this.#scene_3D);\n        this.#canvas_3D.clear();\n        this.#sprite_3D.texture.update();\n    }\n    #clearScene(sc) {\n        sc.children.slice().map(o => this.#clearObject3D(o));\n    }\n    #clearObject3D(o) {\n        o.parent.remove(o);\n        const s = o;\n        if (s) {\n            const inf = this.#hInf[s.name];\n            if (inf && inf.mixer)\n                inf.mixer.stopAllAction();\n            this.#clearScene(s);\n            return;\n        }\n        const m = o;\n        if (!m)\n            return;\n        m.geometry.dispose();\n        if (m.material instanceof three_1.Material) {\n            m.material.dispose();\n            if (m.material)\n                m.material = [];\n        }\n        else {\n            m.material.map(v => v.dispose());\n        }\n    }\n    record = () => Object.assign(super.record(), {\n        hInf: this.#hInf,\n    });\n    playback(hLay, aPrm) {\n        super.playback(hLay, aPrm);\n        this.#hInf = hLay.hInf;\n        if (!this.#scene_3D)\n            return;\n    }\n    dump() {\n        if (!this.#scene_3D)\n            return `\"is\":\"nothing\"`;\n        const aChi = [];\n        this.#scene_3D.children.map(o => {\n            let s = `\"${o.name}\": {\"type\":\"${o.type}\"`;\n            const inf = this.#hInf[o.name];\n            if (inf && inf.mixer)\n                s += `, \"label\":\"${inf.label}\"`;\n            aChi.push(s + `}`);\n        });\n        return super.dump() + `, \"mdl\":{${aChi.join(',')}}`;\n    }\n}\nexports.ThreeDLayer = ThreeDLayer;\n\n\n//# sourceURL=webpack://gallery/./core/plugin/3d_layer/ThreeDLayer.ts?");

/***/ }),

/***/ "./core/plugin/3d_layer/index.ts":
/*!***************************************!*\
  !*** ./core/plugin/3d_layer/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.init = init;\nconst ThreeDLayer_1 = __webpack_require__(/*! ./ThreeDLayer */ \"./core/plugin/3d_layer/ThreeDLayer.ts\");\nasync function init(pia) {\n    pia.addLayCls('3d', () => new ThreeDLayer_1.ThreeDLayer(pia));\n    return ThreeDLayer_1.ThreeDLayer.init();\n}\n;\n\n\n//# sourceURL=webpack://gallery/./core/plugin/3d_layer/index.ts?");

/***/ }),

/***/ "./core/plugin/cubism3_layer/Cubism3Layer.ts":
/*!***************************************************!*\
  !*** ./core/plugin/cubism3_layer/Cubism3Layer.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Cubism3Layer = void 0;\nconst { Layer, argChk_Num } = __webpack_require__(/*! @famibee/skynovel/web */ \"./node_modules/@famibee/skynovel/dist/web.js\");\nconst pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\");\nclass Cubism3Layer extends Layer {\n    model;\n    ldr = new pixi_js_1.Loader;\n    state = {\n        fn: '',\n        label: '',\n        scale: 1,\n    };\n    lay(hArg, fncComp) {\n        super.lay(hArg);\n        const id = hArg.id || '0';\n        const fn = hArg.fn;\n        if (fn) {\n            const label = hArg.label;\n            if (!label)\n                throw `label属性でモーションjsonファイル（${fn}_(label).json）を指定して下さい`;\n            let needLoad = false;\n            ['moc', 'tex', 'mot'].map((type, i) => {\n                const rn = `l2d:${fn}_${type}`;\n                if (rn in this.ldr.resources)\n                    return;\n                if (rn in pixi_js_1.utils.TextureCache)\n                    pixi_js_1.utils.TextureCache[rn].destroy(true);\n                needLoad = true;\n                if (this.ldr.loading)\n                    this.ldr = new pixi_js_1.Loader();\n                switch (i) {\n                    case 0:\n                        this.ldr.add({\n                            name: rn,\n                            url: Cubism3Layer.pia.searchPath(fn, 'moc3_|moc3'),\n                            xhrType: pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.BUFFER,\n                        });\n                        break;\n                    case 1:\n                        this.ldr.add({\n                            name: rn,\n                            url: Cubism3Layer.pia.searchPath(fn, 'png_|png|jpg_|jpg|jpeg_|jpeg'),\n                        });\n                        break;\n                    case 2:\n                        this.ldr.add({\n                            name: rn,\n                            url: Cubism3Layer.pia.searchPath(fn + '_' + label, 'json_|json'),\n                            xhrType: pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.JSON,\n                        });\n                        break;\n                }\n            });\n            const fncLoaded = (res) => {\n                const moc = Live2DCubismCore.Moc.fromArrayBuffer(res['l2d:' + fn + '_moc'].data);\n                this.model = new LIVE2DCUBISMPIXI.ModelBuilder()\n                    .setMoc(moc)\n                    .setTimeScale(1)\n                    .addTexture(0, (res['l2d:' + fn + '_tex'] || pixi_js_1.utils.TextureCache['l2d:' + fn + '_tex']).texture)\n                    .addAnimatorLayer(id, LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE, 1)\n                    .build();\n                this.spLay.addChild(this.model);\n                const ani = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(res['l2d:' + fn + '_mot'].data);\n                this.model.animator\n                    .getLayer(id)\n                    .play(ani);\n                const tick = () => {\n                    this.hdl_tick = requestAnimationFrame(tick);\n                    if (this.model)\n                        this.model.update(1);\n                };\n                this.hdl_tick = requestAnimationFrame(tick);\n                const a = { ...hArg };\n                delete a.fn;\n                delete a.label;\n                this.state.fn = fn;\n                this.state.label = label;\n                this.lay(a, fncComp);\n                Cubism3Layer.pia.resume(fncComp);\n            };\n            if (needLoad)\n                this.ldr.load((_loader, res) => fncLoaded(res));\n            else\n                fncLoaded(this.ldr.resources);\n            return true;\n        }\n        if (!this.state.fn)\n            return false;\n        if ('label' in hArg) {\n            const label = hArg.label || '';\n            if (this.state.label != label) {\n                this.state.label = label;\n                const fn = this.state.fn;\n                const fn_mot = Cubism3Layer.pia.searchPath(fn + '_' + label, 'json_|json');\n                new pixi_js_1.Loader()\n                    .add({ name: 'l2d:' + fn + '_mot', url: fn_mot, xhrType: pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.JSON })\n                    .load((_loader, res) => {\n                    const ani = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(res['l2d:' + fn + '_mot'].data);\n                    this.model.animator\n                        .getLayer(id)\n                        .play(ani);\n                });\n            }\n        }\n        if ('scale' in hArg) {\n            this.state.scale = argChk_Num(hArg, 'scale', 1);\n            this.model.scale = new pixi_js_1.Point(this.state.scale, this.state.scale);\n            this.model.x = this.model.width / 2;\n            this.model.y = this.model.height / 2;\n        }\n        Layer.setXY(this.model, hArg, this.spLay, true);\n        return false;\n    }\n    hdl_tick = 0;\n    clearLay(hArg) {\n        super.clearLay(hArg);\n        if (this.model) {\n            cancelAnimationFrame(this.hdl_tick);\n            this.spLay.removeChild(this.model);\n            this.model = null;\n        }\n        this.state = {\n            fn: '',\n            label: '',\n            scale: 1,\n        };\n    }\n    record = () => Object.assign(super.record(), this.state);\n    playback(hLay, fncComp = undefined) {\n        super.playback(hLay);\n        return this.lay(hLay, fncComp);\n    }\n    destroy() { this.clearLay({}); }\n}\nexports.Cubism3Layer = Cubism3Layer;\n\n\n//# sourceURL=webpack://gallery/./core/plugin/cubism3_layer/Cubism3Layer.ts?");

/***/ }),

/***/ "./core/plugin/cubism3_layer/index.ts":
/*!********************************************!*\
  !*** ./core/plugin/cubism3_layer/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.init = init;\nconst Cubism3Layer_1 = __webpack_require__(/*! ./Cubism3Layer */ \"./core/plugin/cubism3_layer/Cubism3Layer.ts\");\nasync function init(pia) {\n    pia.addLayCls('cubism3', () => new Cubism3Layer_1.Cubism3Layer);\n}\n;\n\n\n//# sourceURL=webpack://gallery/./core/plugin/cubism3_layer/index.ts?");

/***/ }),

/***/ "./core/plugin/emote_layer/EmoteLayer.ts":
/*!***********************************************!*\
  !*** ./core/plugin/emote_layer/EmoteLayer.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EmoteLayer = void 0;\nconst { Layer, argChk_Num } = __webpack_require__(/*! @famibee/skynovel/web */ \"./node_modules/@famibee/skynovel/dist/web.js\");\nconst pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\");\nclass EmoteLayer extends Layer {\n    pia;\n    static #uniq_num = 0;\n    static #stageW = 0;\n    static #stageH = 0;\n    #rt;\n    #cvs;\n    #sp = new pixi_js_1.Sprite;\n    #inf;\n    constructor(pia) {\n        super();\n        this.pia = pia;\n        if (EmoteLayer.#uniq_num++ % 2 === 1)\n            return;\n        if (EmoteLayer.#uniq_num === 1) {\n            const { window: { width, height } } = pia.getInfo();\n            EmoteLayer.#stageW = width;\n            EmoteLayer.#stageH = height;\n            switch (String(this.pia.getVal('const.sn.platform.os.family'))) {\n                case 'Android':\n                case 'iOS':\n                    EmotePlayer.maskMode = EmotePlayer.MaskMode.STENCIL;\n                    break;\n            }\n            EmotePlayer.createRenderCanvas(EmoteLayer.#stageW, EmoteLayer.#stageH);\n        }\n        this.#rt = pixi_js_1.RenderTexture.create({ width: EmoteLayer.#stageW, height: EmoteLayer.#stageH });\n        this.spLay.addChild(new pixi_js_1.Sprite(this.#rt));\n        this.#cvs = document.createElement('canvas');\n        this.#cvs.id = `emote:${EmoteLayer.#uniq_num}`;\n        this.#cvs.width = EmoteLayer.#stageW;\n        this.#cvs.height = EmoteLayer.#stageH;\n        this.#cvs.hidden = true;\n        const cvsSN = document.getElementById('skynovel');\n        cvsSN.parentElement.appendChild(this.#cvs);\n        this.#sp.width = EmoteLayer.#stageW;\n        this.#sp.height = EmoteLayer.#stageH;\n    }\n    lay(hArg, fncComp) {\n        if (!this.#rt)\n            return false;\n        const layer = hArg.layer;\n        if (!layer) {\n            if (hArg[':タグ名'] === 'add_lay')\n                return false;\n            throw `layerは必須です`;\n        }\n        super.lay(hArg);\n        if (hArg.fn) {\n            const fn = hArg.fn;\n            const player = new EmotePlayer(this.#cvs);\n            this.#inf = {\n                fn: fn,\n                player: player,\n            };\n            const a = { ...hArg };\n            delete a.fn;\n            a[':タグ名'] = 'lay';\n            player.onUpdate = () => {\n                if (!player)\n                    return;\n                this.#sp.texture.destroy();\n                this.#sp.texture = new pixi_js_1.Texture(new pixi_js_1.BaseTexture(this.#cvs));\n                this.pia.render(this.#sp, this.#rt, true);\n            };\n            player.promiseLoadDataFromURL(this.pia.searchPath(fn, 'emtbytes_|emtbytes'))\n                .then(() => {\n                this.lay(a, fncComp);\n                this.pia.resume(fncComp);\n            });\n            return true;\n        }\n        else if (hArg[':タグ名'] === 'add_lay')\n            return false;\n        if (!this.#inf)\n            return false;\n        Layer.setXY(this.#sp, hArg, this.spLay, true);\n        const player = this.#inf.player;\n        if (hArg.label) {\n            const a = [...player.mainTimelineLabels, ...player.diffTimelineLabels];\n            if (!a.includes(hArg.label)) {\n                console.error(`エラーが発生しました。参考までに ${this.#inf.fn}.emtbytes 内に存在するアニメ名を列挙します`);\n                a.forEach(v => console.info(`  label=${v}`));\n                throw `${this.#inf.fn}.emtbytes 内に存在しないアニメ（label=${hArg.label}）です`;\n            }\n            player.mainTimelineLabel = hArg.label;\n        }\n        if ('scale' in hArg)\n            player.scale = argChk_Num(hArg, 'scale', 1);\n        if ('grayscale' in hArg)\n            player.grayscale = argChk_Num(hArg, 'grayscale', 1);\n        if ('windSpeed' in hArg)\n            player.windSpeed = argChk_Num(hArg, 'windSpeed', 0);\n        if ('windPowerMin' in hArg)\n            player.windPowerMin = argChk_Num(hArg, 'windPowerMin', 0);\n        if ('windPowerMax' in hArg)\n            player.windPowerMax = argChk_Num(hArg, 'windPowerMax', 0);\n        return false;\n    }\n    clearLay(hArg) {\n        if (!this.#rt)\n            return;\n        super.clearLay(hArg);\n        if (!this.#inf)\n            return;\n        this.#inf.player.onUpdate = () => { };\n        this.#inf.player.unloadData();\n        this.#inf = null;\n        this.#sp.visible = false;\n        this.pia.render(this.#sp, this.#rt, true);\n        this.#sp.visible = true;\n    }\n    record = () => Object.assign(super.record(), (this.#inf)\n        ? {\n            fn: this.#inf.fn,\n            label: this.#inf.player.mainTimelineLabel,\n            scale: this.#inf.player.scale,\n            grayscale: this.#inf.player.grayscale,\n            windSpeed: this.#inf.player.windSpeed,\n            windPowerMin: this.#inf.player.windPowerMin,\n            windPowerMax: this.#inf.player.windPowerMax,\n        }\n        : { fn: '' });\n    playback(hLay, fncComp = undefined) {\n        super.playback(hLay);\n        if (hLay.fn)\n            return this.lay(hLay, fncComp);\n        this.clearLay(hLay);\n        return false;\n    }\n    dump() {\n        if (!this.#rt)\n            return `\"is\":\"nothing\"`;\n        return super.dump() + ((this.#inf)\n            ? `, \"mdl\":{\"fn\":\"${this.#inf.fn}\",\"label\":\"${this.#inf.player.mainTimelineLabel}\",\"scale\":\"${this.#inf.player.scale}\"}`\n            : `, \"mdl\":{\"fn\":\"\"}`);\n    }\n    ;\n    destroy() {\n        if (!this.#rt)\n            return;\n        this.clearLay({});\n        this.#cvs.parentElement.removeChild(this.#cvs);\n        this.spLay.removeChildren().forEach((v) => v.destroy());\n    }\n}\nexports.EmoteLayer = EmoteLayer;\n\n\n//# sourceURL=webpack://gallery/./core/plugin/emote_layer/EmoteLayer.ts?");

/***/ }),

/***/ "./core/plugin/emote_layer/index.ts":
/*!******************************************!*\
  !*** ./core/plugin/emote_layer/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.init = init;\nconst EmoteLayer_1 = __webpack_require__(/*! ./EmoteLayer */ \"./core/plugin/emote_layer/EmoteLayer.ts\");\nasync function init(pia) {\n    pia.addLayCls('emote', () => new EmoteLayer_1.EmoteLayer(pia));\n}\n;\n\n\n//# sourceURL=webpack://gallery/./core/plugin/emote_layer/index.ts?");

/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://gallery/./util.inspect_(ignored)?");

/***/ }),

/***/ "./core/plugin/pass.json":
/*!*******************************!*\
  !*** ./core/plugin/pass.json ***!
  \*******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"pass\":\"8c1ae1c9-bbf6-40fe-bc12-7c5890e7895c\",\"salt\":\"90434bb510043673f677ef42ed0b4e76\",\"iv\":\"5a8aec26a5f1e38a372a180460f26c2a\",\"ite\":524,\"stk\":\"7edc2b487aa65fdff5ff4d0034825da9\"}');\n\n//# sourceURL=webpack://gallery/./core/plugin/pass.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "web." + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "gallery:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgallery"] = self["webpackChunkgallery"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["three","skynovel","vendor"], () => (__webpack_require__("./core/web4webpack.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;