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
//import { EmotePlayer } from "./emoteplayer";

let uniq_num = 0;

export class EmoteLayer extends Layer {
	static	plgArg	: IPluginInitArg;

	private cvs		: HTMLCanvasElement;
	private	player	: any;

	private	sp		: PIXI.Sprite;
	private rt		: PIXI.RenderTexture;

	private	state	= {
		fn		: '',
		scale	: 1,
		label	: '',
	};

	constructor() {
		super();

		const w = Number(EmoteLayer.plgArg.getVal('const.sn.config.window.width'));
		const h = Number(EmoteLayer.plgArg.getVal('const.sn.config.window.height'));

		this.rt = PIXI.RenderTexture.create(w, h);
		this.sp = new PIXI.Sprite(this.rt);
		this.cnt.addChild(this.sp);

		this.cvs = document.createElement('canvas');
		this.cvs.id = `emote:${uniq_num++}`;
		this.cvs.width = w;
		this.cvs.height = h;
		this.cvs.hidden = true;
		const cvsSN = document.getElementById('skynovel') as HTMLCanvasElement;
		cvsSN.parentElement!.appendChild(this.cvs);

		EmotePlayer.createRenderCanvas(w, h);
		this.player = new EmotePlayer(this.cvs);

		const fncTick = ()=> {
			EmoteLayer.plgArg.render(new PIXI.Sprite(
				new PIXI.Texture(new PIXI.BaseTexture(this.cvs))
			), this.rt, true);

			requestAnimationFrame(fncTick);
		};
		this.tick = ()=> requestAnimationFrame(fncTick);
	}
	private tick = ()=> {};

	lay(hArg: HArg, fncComp?: ()=> void): boolean {
		super.lay(hArg);

		const fn = hArg.fn;
		if (fn) {
			const a = {...hArg};
			delete a.fn;
			this.player.promiseLoadDataFromURL(EmoteLayer.plgArg.searchPath(fn, 'emtbytes_|emtbytes'))
			.then(()=> {
				this.state.fn = fn;
				this.lay(a, fncComp);
				this.tick();
				EmoteLayer.plgArg.resume(fncComp);
			});
			return true;
		}
		if (! this.state.fn) return false;

		if ('scale' in hArg) this.state.scale = this.player.scale = CmnLib.argChk_Num(hArg, 'scale', 1);
		if ('label' in hArg) this.state.label = this.player.mainTimelineLabel = hArg.label || '';

		return false;
	}

	clearLay(hArg: HArg): void {
		super.clearLay(hArg);
		this.player.unloadData();
		this.state	= {
			fn		: '',
			scale	: 1,
			label	: '',
		};
	}
	record = ()=> Object.assign(super.record(), this.state);
	playback(hLay: any, fncComp: undefined | {(): void} = undefined): boolean {
		super.playback(hLay);
		return this.lay(hLay, fncComp);
	}
}
