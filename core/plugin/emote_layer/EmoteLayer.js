"use strict";
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
var _a, _EmoteLayer_uniq_num, _EmoteLayer_stageW, _EmoteLayer_stageH, _EmoteLayer_rt, _EmoteLayer_cvs, _EmoteLayer_sp, _EmoteLayer_inf;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmoteLayer = void 0;
const { Layer, argChk_Num } = require('@famibee/skynovel/web');
const pixi_js_1 = require("pixi.js");
class EmoteLayer extends Layer {
    constructor(pia) {
        var _b, _c, _d;
        super();
        this.pia = pia;
        _EmoteLayer_rt.set(this, void 0);
        _EmoteLayer_cvs.set(this, void 0);
        _EmoteLayer_sp.set(this, new pixi_js_1.Sprite);
        _EmoteLayer_inf.set(this, void 0);
        this.record = () => Object.assign(super.record(), (__classPrivateFieldGet(this, _EmoteLayer_inf, "f"))
            ? {
                fn: __classPrivateFieldGet(this, _EmoteLayer_inf, "f").fn,
                label: __classPrivateFieldGet(this, _EmoteLayer_inf, "f").player.mainTimelineLabel,
                scale: __classPrivateFieldGet(this, _EmoteLayer_inf, "f").player.scale,
                grayscale: __classPrivateFieldGet(this, _EmoteLayer_inf, "f").player.grayscale,
                windSpeed: __classPrivateFieldGet(this, _EmoteLayer_inf, "f").player.windSpeed,
                windPowerMin: __classPrivateFieldGet(this, _EmoteLayer_inf, "f").player.windPowerMin,
                windPowerMax: __classPrivateFieldGet(this, _EmoteLayer_inf, "f").player.windPowerMax,
            }
            : { fn: '' });
        if ((__classPrivateFieldSet(_b = EmoteLayer, _a, (_d = __classPrivateFieldGet(_b, _a, "f", _EmoteLayer_uniq_num), _c = _d++, _d), "f", _EmoteLayer_uniq_num), _c) % 2 === 1)
            return;
        if (__classPrivateFieldGet(EmoteLayer, _a, "f", _EmoteLayer_uniq_num) === 1) {
            const { window: { width, height } } = pia.getInfo();
            __classPrivateFieldSet(EmoteLayer, _a, width, "f", _EmoteLayer_stageW);
            __classPrivateFieldSet(EmoteLayer, _a, height, "f", _EmoteLayer_stageH);
            switch (String(this.pia.getVal('const.sn.platform.os.family'))) {
                case 'Android':
                case 'iOS':
                    EmotePlayer.maskMode = EmotePlayer.MaskMode.STENCIL;
                    break;
            }
            EmotePlayer.createRenderCanvas(__classPrivateFieldGet(EmoteLayer, _a, "f", _EmoteLayer_stageW), __classPrivateFieldGet(EmoteLayer, _a, "f", _EmoteLayer_stageH));
        }
        __classPrivateFieldSet(this, _EmoteLayer_rt, pixi_js_1.RenderTexture.create({ width: __classPrivateFieldGet(EmoteLayer, _a, "f", _EmoteLayer_stageW), height: __classPrivateFieldGet(EmoteLayer, _a, "f", _EmoteLayer_stageH) }), "f");
        this.spLay.addChild(new pixi_js_1.Sprite(__classPrivateFieldGet(this, _EmoteLayer_rt, "f")));
        __classPrivateFieldSet(this, _EmoteLayer_cvs, document.createElement('canvas'), "f");
        __classPrivateFieldGet(this, _EmoteLayer_cvs, "f").id = `emote:${__classPrivateFieldGet(EmoteLayer, _a, "f", _EmoteLayer_uniq_num)}`;
        __classPrivateFieldGet(this, _EmoteLayer_cvs, "f").width = __classPrivateFieldGet(EmoteLayer, _a, "f", _EmoteLayer_stageW);
        __classPrivateFieldGet(this, _EmoteLayer_cvs, "f").height = __classPrivateFieldGet(EmoteLayer, _a, "f", _EmoteLayer_stageH);
        __classPrivateFieldGet(this, _EmoteLayer_cvs, "f").hidden = true;
        const cvsSN = document.getElementById('skynovel');
        cvsSN.parentElement.appendChild(__classPrivateFieldGet(this, _EmoteLayer_cvs, "f"));
        __classPrivateFieldGet(this, _EmoteLayer_sp, "f").width = __classPrivateFieldGet(EmoteLayer, _a, "f", _EmoteLayer_stageW);
        __classPrivateFieldGet(this, _EmoteLayer_sp, "f").height = __classPrivateFieldGet(EmoteLayer, _a, "f", _EmoteLayer_stageH);
    }
    lay(hArg, fncComp) {
        if (!__classPrivateFieldGet(this, _EmoteLayer_rt, "f"))
            return false;
        const layer = hArg.layer;
        if (!layer) {
            if (hArg[':タグ名'] === 'add_lay')
                return false;
            throw `layerは必須です`;
        }
        super.lay(hArg);
        if (hArg.fn) {
            const fn = hArg.fn;
            const player = new EmotePlayer(__classPrivateFieldGet(this, _EmoteLayer_cvs, "f"));
            __classPrivateFieldSet(this, _EmoteLayer_inf, {
                fn: fn,
                player: player,
            }, "f");
            const a = { ...hArg };
            delete a.fn;
            a[':タグ名'] = 'lay';
            player.onUpdate = () => {
                if (!player)
                    return;
                __classPrivateFieldGet(this, _EmoteLayer_sp, "f").texture.destroy();
                __classPrivateFieldGet(this, _EmoteLayer_sp, "f").texture = new pixi_js_1.Texture(new pixi_js_1.BaseTexture(__classPrivateFieldGet(this, _EmoteLayer_cvs, "f")));
                this.pia.render(__classPrivateFieldGet(this, _EmoteLayer_sp, "f"), __classPrivateFieldGet(this, _EmoteLayer_rt, "f"), true);
            };
            player.promiseLoadDataFromURL(this.pia.searchPath(fn, 'emtbytes_|emtbytes'))
                .then(() => {
                this.lay(a, fncComp);
                this.pia.resume(fncComp);
            });
            return true;
        }
        else if (hArg[':タグ名'] === 'add_lay')
            return false;
        if (!__classPrivateFieldGet(this, _EmoteLayer_inf, "f"))
            return false;
        Layer.setXY(__classPrivateFieldGet(this, _EmoteLayer_sp, "f"), hArg, this.spLay, true);
        const player = __classPrivateFieldGet(this, _EmoteLayer_inf, "f").player;
        if (hArg.label) {
            const a = [...player.mainTimelineLabels, ...player.diffTimelineLabels];
            if (!a.includes(hArg.label)) {
                console.error(`エラーが発生しました。参考までに ${__classPrivateFieldGet(this, _EmoteLayer_inf, "f").fn}.emtbytes 内に存在するアニメ名を列挙します`);
                a.forEach(v => console.info(`  label=${v}`));
                throw `${__classPrivateFieldGet(this, _EmoteLayer_inf, "f").fn}.emtbytes 内に存在しないアニメ（label=${hArg.label}）です`;
            }
            player.mainTimelineLabel = hArg.label;
        }
        if ('scale' in hArg)
            player.scale = argChk_Num(hArg, 'scale', 1);
        if ('grayscale' in hArg)
            player.grayscale = argChk_Num(hArg, 'grayscale', 1);
        if ('windSpeed' in hArg)
            player.windSpeed = argChk_Num(hArg, 'windSpeed', 0);
        if ('windPowerMin' in hArg)
            player.windPowerMin = argChk_Num(hArg, 'windPowerMin', 0);
        if ('windPowerMax' in hArg)
            player.windPowerMax = argChk_Num(hArg, 'windPowerMax', 0);
        return false;
    }
    clearLay(hArg) {
        if (!__classPrivateFieldGet(this, _EmoteLayer_rt, "f"))
            return;
        super.clearLay(hArg);
        if (!__classPrivateFieldGet(this, _EmoteLayer_inf, "f"))
            return;
        __classPrivateFieldGet(this, _EmoteLayer_inf, "f").player.onUpdate = () => { };
        __classPrivateFieldGet(this, _EmoteLayer_inf, "f").player.unloadData();
        __classPrivateFieldSet(this, _EmoteLayer_inf, null, "f");
        __classPrivateFieldGet(this, _EmoteLayer_sp, "f").visible = false;
        this.pia.render(__classPrivateFieldGet(this, _EmoteLayer_sp, "f"), __classPrivateFieldGet(this, _EmoteLayer_rt, "f"), true);
        __classPrivateFieldGet(this, _EmoteLayer_sp, "f").visible = true;
    }
    playback(hLay, fncComp = undefined) {
        super.playback(hLay);
        if (hLay.fn)
            return this.lay(hLay, fncComp);
        this.clearLay(hLay);
        return false;
    }
    dump() {
        if (!__classPrivateFieldGet(this, _EmoteLayer_rt, "f"))
            return `"is":"nothing"`;
        return super.dump() + ((__classPrivateFieldGet(this, _EmoteLayer_inf, "f"))
            ? `, "mdl":{"fn":"${__classPrivateFieldGet(this, _EmoteLayer_inf, "f").fn}","label":"${__classPrivateFieldGet(this, _EmoteLayer_inf, "f").player.mainTimelineLabel}","scale":"${__classPrivateFieldGet(this, _EmoteLayer_inf, "f").player.scale}"}`
            : `, "mdl":{"fn":""}`);
    }
    ;
    destroy() {
        if (!__classPrivateFieldGet(this, _EmoteLayer_rt, "f"))
            return;
        this.clearLay({});
        __classPrivateFieldGet(this, _EmoteLayer_cvs, "f").parentElement.removeChild(__classPrivateFieldGet(this, _EmoteLayer_cvs, "f"));
        this.spLay.removeChildren().forEach((v) => v.destroy());
    }
}
exports.EmoteLayer = EmoteLayer;
_a = EmoteLayer, _EmoteLayer_rt = new WeakMap(), _EmoteLayer_cvs = new WeakMap(), _EmoteLayer_sp = new WeakMap(), _EmoteLayer_inf = new WeakMap();
_EmoteLayer_uniq_num = { value: 0 };
_EmoteLayer_stageW = { value: 0 };
_EmoteLayer_stageH = { value: 0 };
//# sourceMappingURL=EmoteLayer.js.map