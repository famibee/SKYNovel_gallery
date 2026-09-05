/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 凍結中：bluesnovelのpia.render()が空スタブ（src/sn/SysBase.ts）のため、本プラグインが
//	前提とするpixi.js Sprite/RenderTextureへの合成が実行時に機能しない。live2d_layer/
//	3d_layerと同じ「this.ctn(HTMLDivElement)へcanvasを直接appendChild」方式への移植は
//	今回見送り。src/plugin.jsonから外してあり読み込まれない（ファイルは削除せず残置）

import type {T_PluginInitArg} from '@famibee/bluesnovel/web';
import {EmoteLayer} from './EmoteLayer';

export async function init(pia: T_PluginInitArg) {
	pia.addLayCls('emote', ()=> <any>new EmoteLayer(pia));	// any 逃げ
};
