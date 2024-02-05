/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2020-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const {Layer, argChk_Num} = require('@famibee/skynovel/web');
import {HArg} from '@famibee/skynovel';
declare const Live2DCubismCore: any;	// 【名前 '〜' が見つかりません。】対策
declare const LIVE2DCUBISMPIXI: any;
declare const LIVE2DCUBISMFRAMEWORK: any;

import {Loader, utils, Point, LoaderResource} from 'pixi.js';

export class Cubism3Layer extends Layer {
	private	model	: any;	// Container？;

	private ldr		= new Loader

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

			let needLoad = false;
			['moc', 'tex', 'mot'].map((type, i)=> {
				const rn = `l2d:${fn}_${type}`;
				if (rn in this.ldr.resources) return;
				//if (rn in utils.TextureCache) return;
					// これでキャッシュを使うと表示されない
				if (rn in utils.TextureCache) utils.TextureCache[rn].destroy(true);

				needLoad = true;
				if (this.ldr.loading) this.ldr = new Loader();
				switch (i) {
					case 0:
						this.ldr.add({
							name	: rn,
							url		: Cubism3Layer.pia.searchPath(fn, 'moc3_|moc3'),
							xhrType	: LoaderResource.XHR_RESPONSE_TYPE.BUFFER,
						});
						break;

					case 1:
						this.ldr.add({
							name	: rn,
							url		: Cubism3Layer.pia.searchPath(fn, 'png_|png|jpg_|jpg|jpeg_|jpeg'),
						});
						break;

					case 2:
						this.ldr.add({
							name	: rn,
							url		: Cubism3Layer.pia.searchPath(fn +'_'+ label, 'json_|json'),
							xhrType	: LoaderResource.XHR_RESPONSE_TYPE.JSON,
						});
						break;
				}
			});

			const fncLoaded = (res: any)=> {
				const moc = Live2DCubismCore.Moc.fromArrayBuffer(res['l2d:'+ fn +'_moc'].data);
				this.model = new LIVE2DCUBISMPIXI.ModelBuilder()
					.setMoc(moc)
					.setTimeScale(1)
					.addTexture(0, (res['l2d:'+ fn +'_tex'] || utils.TextureCache['l2d:'+ fn +'_tex']).texture)
					.addAnimatorLayer(id, LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE, 1)
					.build();
				this.spLay.addChild(this.model);
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
				Cubism3Layer.pia.resume(fncComp);
			};
			if (needLoad) this.ldr.load((_loader: any, res: any)=> fncLoaded(res));
			else fncLoaded(this.ldr.resources);

			return true;
		}
		if (! this.state.fn) return false;
//		if (! this.model) return false;

		if ('label' in hArg) {
			const label = hArg.label || '';
			if (this.state.label != label) {
				this.state.label = label;
				const fn = this.state.fn;
				const fn_mot = Cubism3Layer.pia.searchPath(fn +'_'+ label, 'json_|json');

				new Loader()
				.add({name: 'l2d:'+ fn +'_mot', url: fn_mot, xhrType: LoaderResource.XHR_RESPONSE_TYPE.JSON})
				.load((_loader: any, res: any)=> {
					const ani = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(res['l2d:'+ fn +'_mot'].data);

					this.model.animator
						.getLayer(id)
						.play(ani);
				});
			}
		}

		if ('scale' in hArg) {
			this.state.scale = argChk_Num(hArg, 'scale', 1);
			this.model.scale = new Point(this.state.scale, this.state.scale);
			this.model.x = this.model.width /2;	// scale変更で変化するので
			this.model.y = this.model.height/2;
		}

		Layer.setXY(this.model, hArg, this.spLay, true);

		return false;
	}
	private hdl_tick = 0;

	clearLay(hArg: HArg): void {
		super.clearLay(hArg);

		if (this.model) {
			cancelAnimationFrame(this.hdl_tick);
			this.spLay.removeChild(this.model);
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
