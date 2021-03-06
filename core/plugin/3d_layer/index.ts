/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IPluginInitArg} from '@famibee/skynovel';
import {ThreeDLayer} from './ThreeDLayer';

exports.init = (plgArg: IPluginInitArg)=> {
	ThreeDLayer.plgArg = plgArg;
	(async ()=> {
		ThreeDLayer.THREE = await import('three');
		globalThis.THREE = ThreeDLayer.THREE;	// requireで必須なので

		plgArg.addLayCls('3d', ()=> <any>new ThreeDLayer);	// any 逃げ
	})();
};
