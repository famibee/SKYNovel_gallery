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
		fn			: '',
		label		: '',
		scale		: 1,
		grayscale	: 1,
		windSpeed	: 0,
		windPowerMin: 0,
		windPowerMax: 0,
//		light		: false,
	};

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
			this.player.onUpdate = ()=> this.hdl_tick = requestAnimationFrame(()=> {
				if (! this.player) return;
//				if (! this.player.canvas) return;
//				if (this.state.light && this.player.animating) return;

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

		const old_x = this.cnt.x;
		const old_y = this.cnt.y;
		Layer.setXY(this.sp, hArg, this.cnt, true);
		if (old_x != this.cnt.x || old_y != this.cnt.y) {
			this.cnt.x -= this.rt.width /2 -1;
			this.cnt.y -= this.rt.height -1;
		}
		// TODO: width, height 指定で程良い大きさにトリム・処理軽量化したい

		if ('scale' in hArg) this.state.scale = this.player.scale = CmnLib.argChk_Num(hArg, 'scale', 1);
		if ('label' in hArg) this.state.label = this.player.mainTimelineLabel = hArg.label || '';
		if ('grayscale' in hArg) this.state.grayscale = this.player.grayscale = CmnLib.argChk_Num(hArg, 'grayscale', 0);
		if ('windSpeed' in hArg) this.state.windSpeed = this.player.windSpeed = CmnLib.argChk_Num(hArg, 'windSpeed', 0);
		if ('windPowerMin' in hArg) this.state.windPowerMin = this.player.windPowerMin = CmnLib.argChk_Num(hArg, 'windPowerMin', 0);
		if ('windPowerMax' in hArg) this.state.windPowerMax = this.player.windPowerMax = CmnLib.argChk_Num(hArg, 'windPowerMax', 0);
//		if ('light' in hArg) this.state.light = CmnLib.argChk_Boolean(hArg, 'light', false);

		return false;
	}
	private hdl_tick = 0;

	clearLay(hArg: HArg): void {
		super.clearLay(hArg);

		if (this.player) {
			cancelAnimationFrame(this.hdl_tick);
			this.player.unloadData();
			this.player = null;
		}
		this.state	= {
			fn		: '',
			label	: '',
			scale	: 1,
			grayscale	: 1,
			windSpeed	: 0,
			windPowerMin: 0,
			windPowerMax: 0,
//			light		: false,
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
