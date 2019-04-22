"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require('skynovel/core/lib/sn/Layer');
const Layer = Layer_1.Layer;
const CmnLib_1 = require('skynovel/core/lib/sn/CmnLib');
const CmnLib = CmnLib_1.CmnLib;
class EmoteLayer extends Layer {
    constructor() {
        super();
        this.sp = new PIXI.Sprite;
        this.record = () => Object.assign(super.record(), {
            fn: this.fn,
            label: (this.player) ? this.player.mainTimelineLabel : '',
            scale: (this.player) ? this.player.scale : 1,
            grayscale: (this.player) ? this.player.grayscale : 1,
            windSpeed: (this.player) ? this.player.windSpeed : 0,
            windPowerMin: (this.player) ? this.player.windPowerMin : 0,
            windPowerMax: (this.player) ? this.player.windPowerMax : 0,
        });
        if (!EmoteLayer.initedEMote) {
            switch (String(EmoteLayer.plgArg.getVal('const.sn.platform.os.family'))) {
                case 'Android':
                case 'iOS':
                    EmotePlayer.maskMode = EmotePlayer.MaskMode.STENCIL;
                    break;
            }
            EmoteLayer.initedEMote = true;
            EmotePlayer.createRenderCanvas(CmnLib.stageW, CmnLib.stageH);
        }
        if (EmoteLayer.uniq_num++ % 2 == 1)
            return;
        this.rt = PIXI.RenderTexture.create(CmnLib.stageW, CmnLib.stageH);
        this.cnt.addChild(new PIXI.Sprite(this.rt));
        this.cvs = document.createElement('canvas');
        this.cvs.id = `emote:${EmoteLayer.uniq_num}`;
        this.cvs.width = CmnLib.stageW;
        this.cvs.height = CmnLib.stageH;
        this.cvs.hidden = true;
        const cvsSN = document.getElementById('skynovel');
        cvsSN.parentElement.appendChild(this.cvs);
    }
    lay(hArg, fncComp) {
        super.lay(hArg);
        if (hArg.fn) {
            this.fn = hArg.fn;
            this.player = new EmotePlayer(this.cvs);
            const a = Object.assign({}, hArg);
            delete a.fn;
            a['タグ名'] = 'lay';
            this.player.onUpdate = () => {
                if (!this.player)
                    return;
                this.sp.texture.destroy();
                this.sp.texture = new PIXI.Texture(new PIXI.BaseTexture(this.cvs));
                EmoteLayer.plgArg.render(this.sp, this.rt, true);
            };
            this.player.promiseLoadDataFromURL(EmoteLayer.plgArg.searchPath(this.fn, 'emtbytes_|emtbytes'))
                .then(() => {
                this.lay(a, fncComp);
                EmoteLayer.plgArg.resume(fncComp);
            });
            return true;
        }
        else if (hArg['タグ名'] == 'add_lay')
            return false;
        const old_x = this.cnt.x;
        const old_y = this.cnt.y;
        Layer.setXY(this.sp, hArg, this.cnt, true);
        if (old_x != this.cnt.x || old_y != this.cnt.y) {
            this.cnt.x -= this.rt.width / 2 - 1;
            this.cnt.y -= this.rt.height - 1;
        }
        if ('label' in hArg)
            this.player.mainTimelineLabel = hArg.label || '';
        if ('scale' in hArg)
            this.player.scale = CmnLib.argChk_Num(hArg, 'scale', 1);
        if ('grayscale' in hArg)
            this.player.grayscale = CmnLib.argChk_Num(hArg, 'grayscale', 1);
        if ('windSpeed' in hArg)
            this.player.windSpeed = CmnLib.argChk_Num(hArg, 'windSpeed', 0);
        if ('windPowerMin' in hArg)
            this.player.windPowerMin = CmnLib.argChk_Num(hArg, 'windPowerMin', 0);
        if ('windPowerMax' in hArg)
            this.player.windPowerMax = CmnLib.argChk_Num(hArg, 'windPowerMax', 0);
        return false;
    }
    clearLay(hArg) {
        if (!this.cvs)
            return;
        super.clearLay(hArg);
        if (this.player) {
            this.player.onUpdate = () => { };
            this.sp.visible = false;
            EmoteLayer.plgArg.render(this.sp, this.rt, true);
            this.sp.visible = true;
            this.player.unloadData();
            this.player = null;
            this.fn = '';
        }
        ;
    }
    playback(hLay, fncComp = undefined) {
        super.playback(hLay);
        if (hLay.fn)
            return this.lay(hLay, fncComp);
        this.clearLay(hLay);
        return false;
    }
    dump() {
        if (!this.cvs)
            return `"is":"nothing"`;
        return super.dump() + `, "mdl":{"fn":"${this.fn}","label":"${this.player.mainTimelineLabel}"}`;
    }
    ;
    destroy() {
        this.clearLay({});
        this.cvs.parentElement.removeChild(this.cvs);
    }
}
EmoteLayer.uniq_num = 0;
EmoteLayer.initedEMote = false;
exports.EmoteLayer = EmoteLayer;
//# sourceMappingURL=EmoteLayer.js.map