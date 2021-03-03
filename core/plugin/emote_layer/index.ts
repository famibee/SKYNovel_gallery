/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IPluginInitArg} from '@famibee/skynovel';
import {EmoteLayer} from './EmoteLayer';

exports.init = (plgArg: IPluginInitArg)=> {
	EmoteLayer.plgArg = plgArg;
	(async ()=> {
		plgArg.addLayCls('emote', ()=> <any>new EmoteLayer);	// any 逃げ
	})();
};
