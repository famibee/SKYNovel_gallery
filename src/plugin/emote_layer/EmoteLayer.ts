/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2020-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer, argChk_Num} from '@famibee/skynovel';
import type {HArg, IPluginInitArg} from '@famibee/skynovel';

import {RenderTexture, Sprite, Texture, BaseTexture} from 'pixi.js';
// 【名前 '〜' が見つかりません。】対策
declare const EmotePlayer: any;

export interface IInf {
	fn		: string,
	player	: any,
}


export class EmoteLayer extends Layer {
	static	#uniq_num	= 0;
	static	#stageW		= 0;
	static	#stageH		= 0;

				#rt		: RenderTexture;
				#cvs	: HTMLCanvasElement;
	readonly	#sp		= new Sprite;
				#inf	: IInf | null;

	constructor(private pia: IPluginInitArg) {
		super();

		if (EmoteLayer.#uniq_num++ % 2 === 1) return;
		if (EmoteLayer.#uniq_num === 1) {
			const {window: {width, height}} = pia.getInfo();
			EmoteLayer.#stageW = width;
			EmoteLayer.#stageH = height;

			switch (String(this.pia.getVal('const.sn.platform.os.family'))) {
				case 'Android':
				case 'iOS':
					EmotePlayer.maskMode = EmotePlayer.MaskMode.STENCIL; break;
			//	default:
			//		EmotePlayer.maskMode = EmotePlayer.MaskMode.ALPHA;
			}
			EmotePlayer.createRenderCanvas(EmoteLayer.#stageW, EmoteLayer.#stageH);
		}

		this.#rt = RenderTexture.create({width: EmoteLayer.#stageW, height: EmoteLayer.#stageH});
		this.ctn.addChild(new Sprite(this.#rt));

		this.#cvs = document.createElement('canvas');
		this.#cvs.id = `emote:${EmoteLayer.#uniq_num}`;
		this.#cvs.width = EmoteLayer.#stageW;
		this.#cvs.height = EmoteLayer.#stageH;
		this.#cvs.hidden = true;
		// const cvsSN = document.getElementById('skynovel') as HTMLCanvasElement;
		// cvsSN.parentElement!.appendChild(this.#cvs);
			// 不要

		this.#sp.width = EmoteLayer.#stageW;
		this.#sp.height = EmoteLayer.#stageH;
		// TODO: width, height 指定で程良い大きさにトリム・処理軽量化したい
	}

	override lay(hArg: HArg, fncComp?: ()=> void): boolean {
		if (! this.#rt) return false;

		const layer = hArg.layer;
		if (! layer) {
			if (hArg[':タグ名'] === 'add_lay') return false;
			throw `layerは必須です`;	// あり得ないが警告が出るので
		}

		super.lay(hArg);

		if (hArg.fn) {	// 最初のロード
			const fn = hArg.fn;
			const player = new EmotePlayer(this.#cvs);
			this.#inf = {
				fn		: fn,
				player	: player,
			};

			const a = {...hArg};
			delete a.fn;
			a[':タグ名'] = 'lay';

			player.onUpdate = ()=> {
				if (! player) return;
			//	if (! player.canvas) return;
			//	if (this.state.light && player.animating) return;

				this.#sp.texture.destroy();
				this.#sp.texture = new Texture(new BaseTexture(this.#cvs));
				this.pia.render(this.#sp, this.#rt, true);
			}
			player.promiseLoadDataFromURL(this.pia.searchPath(fn, <any>'emtbytes_|emtbytes'))
			.then(()=> {
				this.lay(a, fncComp);
				this.pia.resume(fncComp);
			});

			return true;
		}
		else if (hArg[':タグ名'] === 'add_lay') return false;

		// 以後の操作
		if (! this.#inf) return false;

		Layer.setXY(this.#sp, hArg, this.ctn, true);

		const player = this.#inf.player;
		if (hArg.label) {
			const a = [...player.mainTimelineLabels, ...player.diffTimelineLabels];
			if (! a.includes(hArg.label)) {
				console.error(`エラーが発生しました。参考までに ${this.#inf.fn}.emtbytes 内に存在するアニメ名を列挙します`);
				a.forEach(v=> console.info(`  label=${v}`));
				throw `${this.#inf.fn}.emtbytes 内に存在しないアニメ（label=${hArg.label}）です`;
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

	override clearLay(hArg: HArg): void {
		if (! this.#rt) return;

		super.clearLay(hArg);

		if (! this.#inf) return;
		this.#inf.player.onUpdate = ()=> {};
		// this.#inf.player.unloadData();
		this.#inf = null;

		this.#sp.visible = false;
		this.pia.render(this.#sp, this.#rt, true);
		this.#sp.visible = true;
	}
	override record = ()=> Object.assign(super.record(), (this.#inf)
		? {
			fn		: this.#inf.fn,
			label	: this.#inf.player.mainTimelineLabel,
			scale	: this.#inf.player.scale,
			grayscale	: this.#inf.player.grayscale,
			windSpeed	: this.#inf.player.windSpeed,
			windPowerMin	: this.#inf.player.windPowerMin,
			windPowerMax	: this.#inf.player.windPowerMax,
		}
		: {fn: ''}
	);
	override playback(hLay: any, aPrm: Promise<void>[]): boolean {
		super.playback(hLay, aPrm);
		if (hLay.fn) return this.lay(hLay);

		this.clearLay(hLay);
		return false;
	}

	override dump(): string {
		if (! this.#rt) return `"is":"nothing"`;

		return super.dump() + ((this.#inf)
			? `, "mdl":{"fn":"${this.#inf.fn
				}","label":"${this.#inf.player.mainTimelineLabel
				}","scale":"${this.#inf.player.scale}"}`
			: `, "mdl":{"fn":""}`);
	};

	override destroy() {
		if (! this.#rt) return;

		this.clearLay({});
		// this.#cvs!.parentElement!.removeChild(this.#cvs);
			// 不要
		this.ctn.removeChildren().forEach(v=> v.destroy());
	}

}
