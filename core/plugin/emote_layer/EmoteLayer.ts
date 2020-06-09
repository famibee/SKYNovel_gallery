/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const {Layer, CmnLib, argChk_Num} = require('@famibee/skynovel/web');
import {HArg, IPluginInitArg} from '@famibee/skynovel';
declare const EmotePlayer: any;	// 【名前 '〜' が見つかりません。】対策

import {RenderTexture, Sprite, Texture, BaseTexture} from 'pixi.js';

export interface IInf {
	fn		: string,
	player	: any,
}

export class EmoteLayer extends Layer {
	static	plgArg	: IPluginInitArg;
	private	static	uniq_num = 0;

	private rt		: RenderTexture;
	private cvs		: HTMLCanvasElement;
	private readonly sp		= new Sprite;
	private inf		: IInf | null;

	constructor() {
		super();

		if (EmoteLayer.uniq_num++ % 2 == 1) return;
		if (EmoteLayer.uniq_num == 1) {
			switch (String(EmoteLayer.plgArg.getVal('const.sn.platform.os.family'))) {
				case 'Android':
				case 'iOS':
					EmotePlayer.maskMode = EmotePlayer.MaskMode.STENCIL; break;
			//	default:
			//		EmotePlayer.maskMode = EmotePlayer.MaskMode.ALPHA;
			}
			EmotePlayer.createRenderCanvas(CmnLib.stageW, CmnLib.stageH);
		}

		this.rt = RenderTexture.create({width: CmnLib.stageW, height: CmnLib.stageH});
		this.cnt.addChild(new Sprite(this.rt));

		this.cvs = document.createElement('canvas');
		this.cvs.id = `emote:${EmoteLayer.uniq_num}`;
		this.cvs.width = CmnLib.stageW;
		this.cvs.height = CmnLib.stageH;
		this.cvs.hidden = true;
		const cvsSN = document.getElementById('skynovel') as HTMLCanvasElement;
		cvsSN.parentElement!.appendChild(this.cvs);

		this.sp.width = CmnLib.stageW;
		this.sp.height = CmnLib.stageH;
		// TODO: width, height 指定で程良い大きさにトリム・処理軽量化したい
	}

	lay(hArg: HArg, fncComp?: ()=> void): boolean {
		if (! this.rt) return false;

		const layer = hArg.layer;
		if (! layer) {
			if (hArg['タグ名'] == 'add_lay') return false;
			throw `layerは必須です`;	// あり得ないが警告が出るので
		}

		super.lay(hArg);

		if (hArg.fn) {	// 最初のロード
			const fn = hArg.fn;
			const player = new EmotePlayer(this.cvs);
			this.inf = {
				fn		: fn,
				player	: player,
			};

			const a = {...hArg};
			delete a.fn;
			a['タグ名'] = 'lay';

			player.onUpdate = ()=> {
				if (! player) return;
			//	if (! player.canvas) return;
			//	if (this.state.light && player.animating) return;

				this.sp.texture.destroy();
				this.sp.texture = new Texture(new BaseTexture(this.cvs));
				EmoteLayer.plgArg.render(this.sp, this.rt, true);
			}
			player.promiseLoadDataFromURL(EmoteLayer.plgArg.searchPath(fn, 'emtbytes_|emtbytes'))
			.then(()=> {
				this.lay(a, fncComp);
				EmoteLayer.plgArg.resume(fncComp);
			});

			return true;
		}
		else if (hArg['タグ名'] == 'add_lay') return false;

		// 以後の操作
		if (! this.inf) return false;

		Layer.setXY(this.sp, hArg, this.cnt, true);

		const player = this.inf.player;
		if (hArg.label) {
			const a: Array<string> = player.mainTimelineLabels;
			if (! a.includes(hArg.label)) {
				console.info(`エラーが発生しました。参考までに ${this.inf.fn}.emtbytes 内に存在するアニメ名を列挙します`);
				a.map(v=> console.info(`  label=${v}`));
				throw `${this.inf.fn}.emtbytes 内に存在しないアニメ（label=${hArg.label}）です`;
			}

			player.mainTimelineLabel = hArg.label;
		}
		if ('scale' in hArg) player.scale = argChk_Num(hArg, 'scale', 1);
		if ('grayscale' in hArg) player.grayscale = argChk_Num(hArg, 'grayscale', 1);
		if ('windSpeed' in hArg) player.windSpeed = argChk_Num(hArg, 'windSpeed', 0);
		if ('windPowerMin' in hArg) player.windPowerMin = argChk_Num(hArg, 'windPowerMin', 0);
		if ('windPowerMax' in hArg) player.windPowerMax = argChk_Num(hArg, 'windPowerMax', 0);

		return false;
	}

	clearLay(hArg: HArg): void {
		if (! this.rt) return;

		super.clearLay(hArg);

		if (! this.inf) return;
		this.inf.player.onUpdate = ()=> {};
		this.inf.player.unloadData();
		this.inf = null;

		this.sp.visible = false;
		EmoteLayer.plgArg.render(this.sp, this.rt, true);
		this.sp.visible = true;
	}
	record = ()=> Object.assign(super.record(), (this.inf)
		? {
			fn		: this.inf.fn,
			label	: this.inf.player.mainTimelineLabel,
			scale	: this.inf.player.scale,
			grayscale	: this.inf.player.grayscale,
			windSpeed	: this.inf.player.windSpeed,
			windPowerMin	: this.inf.player.windPowerMin,
			windPowerMax	: this.inf.player.windPowerMax,
		}
		: {fn: ''}
	);
	playback(hLay: any, fncComp: undefined | {(): void} = undefined): boolean {
		super.playback(hLay);
		if (hLay.fn) return this.lay(hLay, fncComp);

		this.clearLay(hLay);
		return false;
	}

	dump(): string {
		if (! this.rt) return `"is":"nothing"`;

		return super.dump() + ((this.inf)
			? `, "mdl":{"fn":"${this.inf.fn
				}","label":"${this.inf.player.mainTimelineLabel
				}","scale":"${this.inf.player.scale}"}`
			: `, "mdl":{"fn":""}`);
	};

	destroy() {
		if (! this.rt) return;

		this.clearLay({});
		this.cvs!.parentElement!.removeChild(this.cvs);
		this.cnt.removeChildren().map((v: Sprite)=> v.destroy());
	}

}
