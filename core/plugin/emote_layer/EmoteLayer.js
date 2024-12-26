"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmoteLayer = void 0;
const skynovel_1 = require("@famibee/skynovel");
const pixi_js_1 = require("pixi.js");
class EmoteLayer extends skynovel_1.Layer {
    pia;
    static #uniq_num = 0;
    static #stageW = 0;
    static #stageH = 0;
    #rt;
    #cvs;
    #sp = new pixi_js_1.Sprite;
    #inf;
    constructor(pia) {
        super();
        this.pia = pia;
        if (EmoteLayer.#uniq_num++ % 2 === 1)
            return;
        if (EmoteLayer.#uniq_num === 1) {
            const { window: { width, height } } = pia.getInfo();
            EmoteLayer.#stageW = width;
            EmoteLayer.#stageH = height;
            switch (String(this.pia.getVal('const.sn.platform.os.family'))) {
                case 'Android':
                case 'iOS':
                    EmotePlayer.maskMode = EmotePlayer.MaskMode.STENCIL;
                    break;
            }
            EmotePlayer.createRenderCanvas(EmoteLayer.#stageW, EmoteLayer.#stageH);
        }
        this.#rt = pixi_js_1.RenderTexture.create({ width: EmoteLayer.#stageW, height: EmoteLayer.#stageH });
        this.ctn.addChild(new pixi_js_1.Sprite(this.#rt));
        this.#cvs = document.createElement('canvas');
        this.#cvs.id = `emote:${EmoteLayer.#uniq_num}`;
        this.#cvs.width = EmoteLayer.#stageW;
        this.#cvs.height = EmoteLayer.#stageH;
        this.#cvs.hidden = true;
        const cvsSN = document.getElementById('skynovel');
        cvsSN.parentElement.appendChild(this.#cvs);
        this.#sp.width = EmoteLayer.#stageW;
        this.#sp.height = EmoteLayer.#stageH;
    }
    lay(hArg, fncComp) {
        if (!this.#rt)
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
            const player = new EmotePlayer(this.#cvs);
            this.#inf = {
                fn: fn,
                player: player,
            };
            const a = { ...hArg };
            delete a.fn;
            a[':タグ名'] = 'lay';
            player.onUpdate = () => {
                if (!player)
                    return;
                this.#sp.texture.destroy();
                this.#sp.texture = new pixi_js_1.Texture(new pixi_js_1.BaseTexture(this.#cvs));
                this.pia.render(this.#sp, this.#rt, true);
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
        if (!this.#inf)
            return false;
        skynovel_1.Layer.setXY(this.#sp, hArg, this.ctn, true);
        const player = this.#inf.player;
        if (hArg.label) {
            const a = [...player.mainTimelineLabels, ...player.diffTimelineLabels];
            if (!a.includes(hArg.label)) {
                console.error(`エラーが発生しました。参考までに ${this.#inf.fn}.emtbytes 内に存在するアニメ名を列挙します`);
                a.forEach(v => console.info(`  label=${v}`));
                throw `${this.#inf.fn}.emtbytes 内に存在しないアニメ（label=${hArg.label}）です`;
            }
            player.mainTimelineLabel = hArg.label;
        }
        if ('scale' in hArg)
            player.scale = (0, skynovel_1.argChk_Num)(hArg, 'scale', 1);
        if ('grayscale' in hArg)
            player.grayscale = (0, skynovel_1.argChk_Num)(hArg, 'grayscale', 1);
        if ('windSpeed' in hArg)
            player.windSpeed = (0, skynovel_1.argChk_Num)(hArg, 'windSpeed', 0);
        if ('windPowerMin' in hArg)
            player.windPowerMin = (0, skynovel_1.argChk_Num)(hArg, 'windPowerMin', 0);
        if ('windPowerMax' in hArg)
            player.windPowerMax = (0, skynovel_1.argChk_Num)(hArg, 'windPowerMax', 0);
        return false;
    }
    clearLay(hArg) {
        if (!this.#rt)
            return;
        super.clearLay(hArg);
        if (!this.#inf)
            return;
        this.#inf.player.onUpdate = () => { };
        this.#inf.player.unloadData();
        this.#inf = null;
        this.#sp.visible = false;
        this.pia.render(this.#sp, this.#rt, true);
        this.#sp.visible = true;
    }
    record = () => Object.assign(super.record(), (this.#inf)
        ? {
            fn: this.#inf.fn,
            label: this.#inf.player.mainTimelineLabel,
            scale: this.#inf.player.scale,
            grayscale: this.#inf.player.grayscale,
            windSpeed: this.#inf.player.windSpeed,
            windPowerMin: this.#inf.player.windPowerMin,
            windPowerMax: this.#inf.player.windPowerMax,
        }
        : { fn: '' });
    playback(hLay, aPrm) {
        super.playback(hLay, aPrm);
        if (hLay.fn)
            return this.lay(hLay);
        this.clearLay(hLay);
        return false;
    }
    dump() {
        if (!this.#rt)
            return `"is":"nothing"`;
        return super.dump() + ((this.#inf)
            ? `, "mdl":{"fn":"${this.#inf.fn}","label":"${this.#inf.player.mainTimelineLabel}","scale":"${this.#inf.player.scale}"}`
            : `, "mdl":{"fn":""}`);
    }
    ;
    destroy() {
        if (!this.#rt)
            return;
        this.clearLay({});
        this.#cvs.parentElement.removeChild(this.#cvs);
        this.ctn.removeChildren().forEach((v) => v.destroy());
    }
}
exports.EmoteLayer = EmoteLayer;
//# sourceMappingURL=EmoteLayer.js.map