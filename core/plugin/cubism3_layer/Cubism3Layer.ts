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

export class Cubism3Layer extends Layer {
	static	plgArg	: IPluginInitArg;

	private	model	: any;	// Model extends PIXI.Container

	private	state	= {
		fn		: '',
		label	: '',
		scale	: 1,
	};

	lay(hArg: HArg, fncComp?: ()=> void): boolean {
		super.lay(hArg);

		const id = hArg.id || '0';

		const fn = hArg.fn;
		if (fn) {
			const label = hArg.label;
			if (! label) throw `label属性でモーションjsonファイル（${fn}_(label).json）を指定して下さい`;

			const fn_moc = Cubism3Layer.plgArg.searchPath(fn, 'moc3_|moc3');
			const fn_tex = Cubism3Layer.plgArg.searchPath(fn, 'png_|png|jpg_|jpg|jpeg_|jpeg');
			const fn_mot = Cubism3Layer.plgArg.searchPath(fn +'_'+ label, 'json_|json');
			// TODO: キャッシュ考慮
			PIXI.loader
			.add('l2d:'+ fn +'_moc', fn_moc, { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER })
			.add('l2d:'+ fn +'_tex', fn_tex)
			.add('l2d:'+ fn +'_mot', fn_mot, { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON })
			.load((_loader: any, res: any)=> {
				const moc = Live2DCubismCore.Moc.fromArrayBuffer(res['l2d:'+ fn +'_moc'].data);
				this.model = new LIVE2DCUBISMPIXI.ModelBuilder()
					.setMoc(moc)
					.setTimeScale(1)
					.addTexture(0, res['l2d:'+ fn +'_tex'].texture)
					.addAnimatorLayer(id, LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE, 1)
					.build();
				this.cnt.addChild(this.model);
				const ani = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(res['l2d:'+ fn +'_mot'].data);

				this.model.animator
					.getLayer(id)
					.play(ani);
				const tick = ()=> {
					this.hdl_tick = requestAnimationFrame(tick);
					if (this.model) this.model.update(1);
				};
				this.hdl_tick = requestAnimationFrame(tick);

				const a = {...hArg};
				delete a.fn;
				delete a.label;
				this.state.fn = fn;
				this.state.label = label;
				this.lay(a, fncComp);
				Cubism3Layer.plgArg.resume(fncComp);
			});

			return true;
		}
		if (! this.state.fn) return false;
//		if (! this.model) return false;

		if ('label' in hArg) {
			const label = hArg.label || '';
			if (this.state.label != label) {
				this.state.label = label;
				const fn = this.state.fn;
				const fn_mot = Cubism3Layer.plgArg.searchPath(fn +'_'+ label, 'json_|json');

				PIXI.loader
				.add('l2d:'+ fn +'_mot', fn_mot, { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON })
				.load((_loader: any, res: any)=> {
					const ani = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(res['l2d:'+ fn +'_mot'].data);

					this.model.animator
						.getLayer(id)
						.play(ani);

				});
			}
		}

		if ('scale' in hArg) {
			this.state.scale = CmnLib.argChk_Num(hArg, 'scale', 1);
			this.model.scale = new PIXI.Point(this.state.scale, this.state.scale);
			this.model.x = this.model.width /2;	// scale変更で変化するので
			this.model.y = this.model.height/2;
		}

		Layer.setXY(this.model, hArg, this.cnt, true);

		return false;
	}
	private hdl_tick = 0;

	clearLay(hArg: HArg): void {
		super.clearLay(hArg);

		if (this.model) {
			cancelAnimationFrame(this.hdl_tick);
			this.cnt.removeChild(this.model);
		//	this.model.destroy();	// Cannot read property 'texture' of undefined
			this.model = null;
		}
		this.state	= {
			fn		: '',
			label	: '',
			scale	: 1,
		};
	}
	record = ()=> Object.assign(super.record(), this.state);
	playback(hLay: any, fncComp: undefined | {(): void} = undefined): boolean {
		super.playback(hLay);
		return this.lay(hLay, fncComp);
	}

	destroy() {this.clearLay({});}

}
