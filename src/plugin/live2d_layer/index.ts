/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_PluginInitArg} from '@famibee/skynovel_esm/web';
import {Live2DLayer} from './Live2DLayer';

export async function init(pia: T_PluginInitArg) {
	pia.addLayCls('live2d', ()=> new Live2DLayer(pia));	// any 逃げ
	return Live2DLayer.init();
};
