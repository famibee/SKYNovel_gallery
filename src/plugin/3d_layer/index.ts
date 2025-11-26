/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_PluginInitArg} from '@famibee/skynovel_esm/web';
import {ThreeDLayer} from './ThreeDLayer';

export async function init(pia: T_PluginInitArg) {
	pia.addLayCls('3d', ()=> new ThreeDLayer(pia));	// any 逃げ
	return ThreeDLayer.init();
};
