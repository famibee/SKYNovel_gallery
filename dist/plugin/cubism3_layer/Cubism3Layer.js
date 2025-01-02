"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cubism3Layer = void 0;
const skynovel_1 = require("@famibee/skynovel");
const pixi_js_1 = require("pixi.js");
class Cubism3Layer extends skynovel_1.Layer {
    pia;
    model;
    ldr = new pixi_js_1.Loader;
    state = {
        fn: '',
        label: '',
        scale: 1,
    };
    constructor(pia) {
        super();
        this.pia = pia;
    }
    lay(hArg, fncComp) {
        super.lay(hArg);
        const id = hArg.id || '0';
        const fn = hArg.fn;
        if (fn) {
            const label = hArg.label;
            if (!label)
                throw `label属性でモーションjsonファイル（${fn}_(label).json）を指定して下さい`;
            let needLoad = false;
            ['moc', 'tex', 'mot'].map((type, i) => {
                const rn = `l2d:${fn}_${type}`;
                if (rn in this.ldr.resources)
                    return;
                if (rn in pixi_js_1.utils.TextureCache)
                    pixi_js_1.utils.TextureCache[rn]?.destroy(true);
                needLoad = true;
                if (this.ldr.loading)
                    this.ldr = new pixi_js_1.Loader();
                switch (i) {
                    case 0:
                        this.ldr.add({
                            name: rn,
                            url: this.pia.searchPath(fn, 'moc3_|moc3'),
                            xhrType: pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.BUFFER,
                        });
                        break;
                    case 1:
                        this.ldr.add({
                            name: rn,
                            url: this.pia.searchPath(fn, 'png_|png|jpg_|jpg|jpeg_|jpeg'),
                        });
                        break;
                    case 2:
                        this.ldr.add({
                            name: rn,
                            url: this.pia.searchPath(fn + '_' + label, 'json_|json'),
                            xhrType: pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.JSON,
                        });
                        break;
                }
            });
            const fncLoaded = (res) => {
                const moc = Live2DCubismCore.Moc.fromArrayBuffer(res['l2d:' + fn + '_moc'].data);
                this.model = new LIVE2DCUBISMPIXI.ModelBuilder()
                    .setMoc(moc)
                    .setTimeScale(1)
                    .addTexture(0, (res['l2d:' + fn + '_tex'] || pixi_js_1.utils.TextureCache['l2d:' + fn + '_tex']).texture)
                    .addAnimatorLayer(id, LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE, 1)
                    .build();
                this.ctn.addChild(this.model);
                const ani = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(res['l2d:' + fn + '_mot'].data);
                this.model.animator
                    .getLayer(id)
                    .play(ani);
                const tick = () => {
                    this.hdl_tick = requestAnimationFrame(tick);
                    if (this.model)
                        this.model.update(1);
                };
                this.hdl_tick = requestAnimationFrame(tick);
                const a = { ...hArg };
                delete a.fn;
                delete a.label;
                this.state.fn = fn;
                this.state.label = label;
                this.lay(a, fncComp);
                this.pia.resume(fncComp);
            };
            if (needLoad)
                this.ldr.load((_loader, res) => fncLoaded(res));
            else
                fncLoaded(this.ldr.resources);
            return true;
        }
        if (!this.state.fn)
            return false;
        if ('label' in hArg) {
            const label = hArg.label || '';
            if (this.state.label != label) {
                this.state.label = label;
                const fn = this.state.fn;
                const fn_mot = this.pia.searchPath(fn + '_' + label, 'json_|json');
                new pixi_js_1.Loader()
                    .add({ name: 'l2d:' + fn + '_mot', url: fn_mot, xhrType: pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.JSON })
                    .load((_loader, res) => {
                    const ani = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(res['l2d:' + fn + '_mot'].data);
                    this.model.animator
                        .getLayer(id)
                        .play(ani);
                });
            }
        }
        if ('scale' in hArg) {
            this.state.scale = (0, skynovel_1.argChk_Num)(hArg, 'scale', 1);
            this.model.scale = new pixi_js_1.Point(this.state.scale, this.state.scale);
            this.model.x = this.model.width / 2;
            this.model.y = this.model.height / 2;
        }
        skynovel_1.Layer.setXY(this.model, hArg, this.ctn, true);
        return false;
    }
    hdl_tick = 0;
    clearLay(hArg) {
        super.clearLay(hArg);
        if (this.model) {
            cancelAnimationFrame(this.hdl_tick);
            this.ctn.removeChild(this.model);
            this.model = null;
        }
        this.state = {
            fn: '',
            label: '',
            scale: 1,
        };
    }
    record = () => Object.assign(super.record(), this.state);
    playback(hLay, aPrm) {
        super.playback(hLay, aPrm);
        return this.lay(hLay);
    }
    destroy() { this.clearLay({}); }
}
exports.Cubism3Layer = Cubism3Layer;
//# sourceMappingURL=Cubism3Layer.js.map