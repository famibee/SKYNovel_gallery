"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require('skynovel/core/lib/sn/Layer');
const Layer = Layer_1.Layer;
const CmnLib_1 = require('skynovel/core/lib/sn/CmnLib');
const CmnLib = CmnLib_1.CmnLib;
const pixi_js_1 = require("pixi.js");
class Cubism3Layer extends Layer {
    constructor() {
        super(...arguments);
        this.ldr = new pixi_js_1.loaders.Loader;
        this.state = {
            fn: '',
            label: '',
            scale: 1,
        };
        this.hdl_tick = 0;
        this.record = () => Object.assign(super.record(), this.state);
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
                    pixi_js_1.utils.TextureCache[rn].destroy(true);
                needLoad = true;
                if (this.ldr.loading)
                    this.ldr = new pixi_js_1.loaders.Loader();
                switch (i) {
                    case 0:
                        this.ldr.add(rn, Cubism3Layer.plgArg.searchPath(fn, 'moc3_|moc3'), { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER });
                        break;
                    case 1:
                        this.ldr.add(rn, Cubism3Layer.plgArg.searchPath(fn, 'png_|png|jpg_|jpg|jpeg_|jpeg'));
                        break;
                    case 2:
                        this.ldr.add(rn, Cubism3Layer.plgArg.searchPath(fn + '_' + label, 'json_|json'), { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
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
                this.cnt.addChild(this.model);
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
                const a = Object.assign({}, hArg);
                delete a.fn;
                delete a.label;
                this.state.fn = fn;
                this.state.label = label;
                this.lay(a, fncComp);
                Cubism3Layer.plgArg.resume(fncComp);
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
                const fn_mot = Cubism3Layer.plgArg.searchPath(fn + '_' + label, 'json_|json');
                PIXI.loader
                    .add('l2d:' + fn + '_mot', fn_mot, { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON })
                    .load((_loader, res) => {
                    const ani = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(res['l2d:' + fn + '_mot'].data);
                    this.model.animator
                        .getLayer(id)
                        .play(ani);
                });
            }
        }
        if ('scale' in hArg) {
            this.state.scale = CmnLib.argChk_Num(hArg, 'scale', 1);
            this.model.scale = new PIXI.Point(this.state.scale, this.state.scale);
            this.model.x = this.model.width / 2;
            this.model.y = this.model.height / 2;
        }
        Layer.setXY(this.model, hArg, this.cnt, true);
        return false;
    }
    clearLay(hArg) {
        super.clearLay(hArg);
        if (this.model) {
            cancelAnimationFrame(this.hdl_tick);
            this.cnt.removeChild(this.model);
            this.model = null;
        }
        this.state = {
            fn: '',
            label: '',
            scale: 1,
        };
    }
    playback(hLay, fncComp = undefined) {
        super.playback(hLay);
        return this.lay(hLay, fncComp);
    }
    destroy() { this.clearLay({}); }
}
exports.Cubism3Layer = Cubism3Layer;
//# sourceMappingURL=Cubism3Layer.js.map