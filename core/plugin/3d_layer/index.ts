/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IPluginInitArg} from 'skynovel';
import {ThreeDLayer} from './ThreeDLayer';

exports.init = (plgArg: IPluginInitArg)=> {
	ThreeDLayer.searchPath = plgArg.searchPath;
	(async ()=> {
		ThreeDLayer.THREE = await import('three');
		(window as any).THREE = ThreeDLayer.THREE;	// 次のrequireで必須なので
		require('three/examples/js/controls/OrbitControls');

		plgArg.addLayCls('3d', ()=> new ThreeDLayer);
	})();
};
