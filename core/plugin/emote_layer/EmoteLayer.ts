/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const Layer_1 = require('skynovel/core/lib/sn/Layer');
const Layer = Layer_1.Layer;
const CmnLib_1 = require('skynovel/core/lib/sn/CmnLib');
const CmnLib = CmnLib_1.CmnLib;

import {HArg, IPluginInitArg} from 'skynovel';
//import { EmotePlayer } from "./EmotePlayer";

declare const EmotePlayer: any;	// 【名前 '〜' が見つかりません。】対策

export class EmoteLayer extends Layer {
	static	plgArg	: IPluginInitArg;
	private	static	uniq_num = 0;

	private	static	initedEMote = false;

	private rt		: PIXI.RenderTexture;
	private cvs		: HTMLCanvasElement;

	constructor() {
		super();

		if (! EmoteLayer.initedEMote) {
			switch (String(EmoteLayer.plgArg.getVal('const.sn.platform.os.family'))) {
				case 'Android':
				case 'iOS':
					EmotePlayer.maskMode = EmotePlayer.MaskMode.STENCIL; break;
			//	default:
			//		EmotePlayer.maskMode = EmotePlayer.MaskMode.ALPHA;
			}
			EmoteLayer.initedEMote = true;
			EmotePlayer.createRenderCanvas(CmnLib.stageW, CmnLib.stageH);
		}
		if (EmoteLayer.uniq_num++ % 2 == 1) return;

		this.rt = PIXI.RenderTexture.create(CmnLib.stageW, CmnLib.stageH);
		this.cnt.addChild(new PIXI.Sprite(this.rt));

		this.cvs = document.createElement('canvas');
		this.cvs.id = `emote:${EmoteLayer.uniq_num}`;
		this.cvs.width = CmnLib.stageW;
		this.cvs.height = CmnLib.stageH;
		this.cvs.hidden = true;
		const cvsSN = document.getElementById('skynovel') as HTMLCanvasElement;
		cvsSN.parentElement!.appendChild(this.cvs);
	}
	private readonly sp = new PIXI.Sprite;

	lay(hArg: HArg, fncComp?: ()=> void): boolean {
		super.lay(hArg);

		if (hArg.fn) {	// 最初のロード
			this.fn = hArg.fn;
			this.player = new EmotePlayer(this.cvs);

			const a = {...hArg};
			delete a.fn;
			a['タグ名'] = 'lay';

			this.player.onUpdate = ()=> {
				if (! this.player) return;
			//	if (! this.player.canvas) return;
			//	if (this.state.light && this.player.animating) return;

				this.sp.texture.destroy();
				this.sp.texture = new PIXI.Texture(new PIXI.BaseTexture(this.cvs));
				EmoteLayer.plgArg.render(this.sp, this.rt, true);
			}
			this.player.promiseLoadDataFromURL(EmoteLayer.plgArg.searchPath(this.fn, 'emtbytes_|emtbytes'))
			.then(()=> {
				this.lay(a, fncComp);
				EmoteLayer.plgArg.resume(fncComp);
			});
			return true;
		}
		else if (hArg['タグ名'] == 'add_lay') return false;

		// 以後の操作
		const old_x = this.cnt.x;
		const old_y = this.cnt.y;
		Layer.setXY(this.sp, hArg, this.cnt, true);
		if (old_x != this.cnt.x || old_y != this.cnt.y) {
			this.cnt.x -= this.rt.width /2 -1;
			this.cnt.y -= this.rt.height -1;
		}
		// TODO: width, height 指定で程良い大きさにトリム・処理軽量化したい

		if ('label' in hArg) this.player.mainTimelineLabel = hArg.label || '';
		if ('scale' in hArg) this.player.scale = CmnLib.argChk_Num(hArg, 'scale', 1);
		if ('grayscale' in hArg) this.player.grayscale = CmnLib.argChk_Num(hArg, 'grayscale', 1);
		if ('windSpeed' in hArg) this.player.windSpeed = CmnLib.argChk_Num(hArg, 'windSpeed', 0);
		if ('windPowerMin' in hArg) this.player.windPowerMin = CmnLib.argChk_Num(hArg, 'windPowerMin', 0);
		if ('windPowerMax' in hArg) this.player.windPowerMax = CmnLib.argChk_Num(hArg, 'windPowerMax', 0);

		return false;
	}
	private player	: any;
	private fn		: string;

	clearLay(hArg: HArg): void {
		if (! this.cvs) return;

		super.clearLay(hArg);

		if (this.player) {
			this.player.onUpdate = ()=> {};
			this.sp.visible = false;
			EmoteLayer.plgArg.render(this.sp, this.rt, true);
			this.sp.visible = true;

			this.player.unloadData();
			this.player = null;
			this.fn = '';
		};
	}
	record = ()=> Object.assign(super.record(), {
		fn		: this.fn,
		label	: (this.player)	?this.player.mainTimelineLabel : '',
		scale	: (this.player) ?this.player.scale : 1,
		grayscale	: (this.player) ?this.player.grayscale : 1,
		windSpeed	: (this.player) ?this.player.windSpeed : 0,
		windPowerMin	: (this.player) ?this.player.windPowerMin : 0,
		windPowerMax	: (this.player) ?this.player.windPowerMax : 0,
	});
	playback(hLay: any, fncComp: undefined | {(): void} = undefined): boolean {
		super.playback(hLay);
		if (hLay.fn) return this.lay(hLay, fncComp);

		this.clearLay(hLay);
		return false;
	}

	dump(): string {
		if (! this.cvs) return `"is":"nothing"`;

		return super.dump() +`, "mdl":{"fn":"${this.fn}","label":"${this.player.mainTimelineLabel}"}`;
	};

	destroy() {
		this.clearLay({});
		this.cvs!.parentElement!.removeChild(this.cvs);
	}

}
