/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {IPluginInitArg} from '@famibee/skynovel';
import {ThreeDLayer} from './ThreeDLayer';

export async function init(pia: IPluginInitArg) {
	pia.addLayCls('3d', ()=> <any>new ThreeDLayer(pia));	// any 逃げ
	return ThreeDLayer.init();
};
