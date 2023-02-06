/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2023 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IPluginInitArg} from '@famibee/skynovel';
import {EmoteLayer} from './EmoteLayer';

export async function init(pia: IPluginInitArg) {
	pia.addLayCls('emote', ()=> <any>new EmoteLayer(pia));	// any 逃げ
};
