/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {IPluginInitArg} from '@famibee/skynovel';
import {Cubism3Layer} from './Cubism3Layer';

export async function init(pia: IPluginInitArg) {
	pia.addLayCls('cubism3', ()=> new Cubism3Layer(pia));	// any 逃げ
};
