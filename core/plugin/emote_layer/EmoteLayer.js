"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require('skynovel/core/lib/sn/Layer');
const Layer = Layer_1.Layer;
const CmnLib_1 = require('skynovel/core/lib/sn/CmnLib');
const CmnLib = CmnLib_1.CmnLib;
class EmoteLayer extends Layer {
    constructor() {
        super();
        this.state = {
            fn: '',
            scale: 1,
            label: '',
            grayscale: 1,
            windSpeed: 0,
            windPowerMin: 0,
            windPowerMax: 0,
        };
        this.sp = new PIXI.Sprite;
        this.record = () => Object.assign(super.record(), this.state);
        const w = Number(EmoteLayer.plgArg.getVal('const.sn.config.window.width'));
        const h = Number(EmoteLayer.plgArg.getVal('const.sn.config.window.height'));
        if (!EmoteLayer.initedEMote) {
            switch (String(EmoteLayer.plgArg.getVal('const.sn.platform.os.family'))) {
                case 'Android':
                case 'iOS':
                    EmotePlayer.maskMode = EmotePlayer.MaskMode.STENCIL;
                    break;
            }
            EmoteLayer.initedEMote = true;
            EmotePlayer.createRenderCanvas(w, h);
        }
        if (EmoteLayer.uniq_num++ % 2 == 1)
            return;
        this.rt = PIXI.RenderTexture.create(w, h);
        this.cnt.addChild(new PIXI.Sprite(this.rt));
        this.cvs = document.createElement('canvas');
        this.cvs.id = `emote:${EmoteLayer.uniq_num}`;
        this.cvs.width = w;
        this.cvs.height = h;
        this.cvs.hidden = true;
        const cvsSN = document.getElementById('skynovel');
        cvsSN.parentElement.appendChild(this.cvs);
        this.player = new EmotePlayer(this.cvs);
    }
    lay(hArg, fncComp) {
        super.lay(hArg);
        if (!this.player)
            return false;
        const fn = hArg.fn;
        if (fn) {
            const a = Object.assign({}, hArg);
            delete a.fn;
            this.state.fn = fn;
            this.player.onUpdate = () => requestAnimationFrame(() => {
                if (!this.player)
                    return;
                this.sp.texture.destroy();
                this.sp.texture = new PIXI.Texture(new PIXI.BaseTexture(this.cvs));
                EmoteLayer.plgArg.render(this.sp, this.rt, true);
            });
            this.player.promiseLoadDataFromURL(EmoteLayer.plgArg.searchPath(fn, 'emtbytes_|emtbytes'))
                .then(() => {
                this.lay(a, fncComp);
                EmoteLayer.plgArg.resume(fncComp);
            });
            return true;
        }
        if (!this.state.fn)
            return false;
        if ('scale' in hArg)
            this.state.scale = this.player.scale = CmnLib.argChk_Num(hArg, 'scale', 1);
        if ('label' in hArg)
            this.state.label = this.player.mainTimelineLabel = hArg.label || '';
        if ('grayscale' in hArg)
            this.state.grayscale = this.player.grayscale = CmnLib.argChk_Num(hArg, 'grayscale', 0);
        if ('windSpeed' in hArg)
            this.state.windSpeed = this.player.windSpeed = CmnLib.argChk_Num(hArg, 'windSpeed', 0);
        if ('windPowerMin' in hArg)
            this.state.windPowerMin = this.player.windPowerMin = CmnLib.argChk_Num(hArg, 'windPowerMin', 0);
        if ('windPowerMax' in hArg)
            this.state.windPowerMax = this.player.windPowerMax = CmnLib.argChk_Num(hArg, 'windPowerMax', 0);
        if ('tst' in hArg && this.player) {
        }
        return false;
    }
    clearLay(hArg) {
        super.clearLay(hArg);
        if (this.player) {
            this.player.unloadData();
            this.player = null;
        }
        this.state = {
            fn: '',
            scale: 1,
            label: '',
            grayscale: 1,
            windSpeed: 0,
            windPowerMin: 0,
            windPowerMax: 0,
        };
    }
    playback(hLay, fncComp = undefined) {
        super.playback(hLay);
        return this.lay(hLay, fncComp);
    }
    destroy() {
        if (!this.player)
            return;
        this.cvs.parentElement.removeChild(this.cvs);
        this.cnt.removeChildren().map((v) => v.destroy());
        this.clearLay({});
    }
}
EmoteLayer.uniq_num = 0;
EmoteLayer.initedEMote = false;
exports.EmoteLayer = EmoteLayer;
//# sourceMappingURL=EmoteLayer.js.map