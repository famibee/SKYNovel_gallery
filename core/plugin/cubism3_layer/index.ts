/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IPluginInitArg} from 'skynovel';
import {Cubism3Layer} from './Cubism3Layer';

exports.init = (plgArg: IPluginInitArg)=> {
	Cubism3Layer.plgArg = plgArg;
	(async ()=> {
		//plgArg.addLayCls('emote', ()=> new Cubism3Layer);
		// 「type is missing the following properties ...」になるので any 逃げ
		plgArg.addLayCls('cubism3', ()=> {const l: any = new Cubism3Layer; return l});
	})();
};
