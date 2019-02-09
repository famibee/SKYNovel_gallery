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

export class EmoteLayer extends Layer {
	static	plgArg	: IPluginInitArg;
	private	static	uniq_num = 0;

	private	static	initedEMote = false;

	private rt		: PIXI.RenderTexture;

	private cvs		: HTMLCanvasElement;
	private	player	: any;

	private	state	= {
		fn		: '',
		scale	: 1,
		label	: '',
	};

	constructor() {
		super();

		const w = Number(EmoteLayer.plgArg.getVal('const.sn.config.window.width'));
		const h = Number(EmoteLayer.plgArg.getVal('const.sn.config.window.height'));

		if (! EmoteLayer.initedEMote) {
			EmoteLayer.initedEMote = true;
			EmotePlayer.createRenderCanvas(w, h);
		}
		if (EmoteLayer.uniq_num++ % 2 == 1) return;

		this.rt = PIXI.RenderTexture.create(w, h);
		this.cnt.addChild(new PIXI.Sprite(this.rt));

		this.cvs = document.createElement('canvas');
		this.cvs.id = `emote:${EmoteLayer.uniq_num}`;
		this.cvs.width = w;
		this.cvs.height = h;
		this.cvs.hidden = true;
		const cvsSN = document.getElementById('skynovel') as HTMLCanvasElement;
		cvsSN.parentElement!.appendChild(this.cvs);
		this.player = new EmotePlayer(this.cvs);
	}
	private sp = new PIXI.Sprite;

	lay(hArg: HArg, fncComp?: ()=> void): boolean {
		super.lay(hArg);
		if (! this.player) return false;

		const fn = hArg.fn;
		if (fn) {
			const a = {...hArg};
			delete a.fn;
			this.state.fn = fn;
			this.player.onUpdate = ()=> requestAnimationFrame(()=> {
//				if (! this.player) return;
//				if (! this.player.canvas) return;

				this.sp.texture.destroy();
				this.sp.texture = new PIXI.Texture(new PIXI.BaseTexture(this.cvs));
				EmoteLayer.plgArg.render(this.sp, this.rt, true);
			});
			this.player.promiseLoadDataFromURL(EmoteLayer.plgArg.searchPath(fn, 'emtbytes_|emtbytes'))
			.then(()=> {
				this.lay(a, fncComp);
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

		if (this.player) {this.player.unloadData(); this.player = null;}
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

	destroy() {
		if (! this.player) return;

		this.cvs.parentElement!.removeChild(this.cvs);
		this.cnt.removeChildren().map((v: PIXI.Sprite)=> v.destroy());

		this.clearLay({});
	}

}
