"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require('skynovel/core/lib/sn/Layer');
const Layer = Layer_1.Layer;
const CmnLib_1 = require('skynovel/core/lib/sn/CmnLib');
const CmnLib = CmnLib_1.CmnLib;
let uniq_num = 0;
class EmoteLayer extends Layer {
    constructor() {
        super();
        this.state = {
            fn: '',
            scale: 1,
            label: '',
        };
        this.fncTick = () => false;
        this.tick = () => { if (this.fncTick())
            requestAnimationFrame(this.tick); };
        this.record = () => Object.assign(super.record(), this.state);
        const w = Number(EmoteLayer.plgArg.getVal('const.sn.config.window.width'));
        const h = Number(EmoteLayer.plgArg.getVal('const.sn.config.window.height'));
        this.rt = PIXI.RenderTexture.create(w, h);
        this.cnt.addChild(new PIXI.Sprite(this.rt));
        this.cvs = document.createElement('canvas');
        this.cvs.id = `emote:${uniq_num++}`;
        this.cvs.width = w;
        this.cvs.height = h;
        this.cvs.hidden = true;
        const cvsSN = document.getElementById('skynovel');
        cvsSN.parentElement.appendChild(this.cvs);
        EmotePlayer.createRenderCanvas(w, h);
        this.player = new EmotePlayer(this.cvs);
    }
    startTick() {
        this.fncTick = () => {
            EmoteLayer.plgArg.render(new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(this.cvs))), this.rt, true);
            return true;
        };
        requestAnimationFrame(this.tick);
    }
    lay(hArg, fncComp) {
        super.lay(hArg);
        const fn = hArg.fn;
        if (fn) {
            const a = Object.assign({}, hArg);
            delete a.fn;
            this.player.promiseLoadDataFromURL(EmoteLayer.plgArg.searchPath(fn, 'emtbytes_|emtbytes'))
                .then(() => {
                this.state.fn = fn;
                this.lay(a, fncComp);
                this.startTick();
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
        return false;
    }
    clearLay(hArg) {
        super.clearLay(hArg);
        this.fncTick = () => false;
        if (this.player) {
            this.player.unloadData();
            this.player = null;
        }
        this.state = {
            fn: '',
            scale: 1,
            label: '',
        };
    }
    playback(hLay, fncComp = undefined) {
        super.playback(hLay);
        return this.lay(hLay, fncComp);
    }
    destroy() {
        this.clearLay({});
    }
}
exports.EmoteLayer = EmoteLayer;
//# sourceMappingURL=EmoteLayer.js.map