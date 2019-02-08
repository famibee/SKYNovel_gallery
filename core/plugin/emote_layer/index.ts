/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IPluginInitArg} from 'skynovel';
import {EmoteLayer} from './EmoteLayer';

exports.init = (plgArg: IPluginInitArg)=> {
	EmoteLayer.plgArg = plgArg;
	(async ()=> {
//		require('three/examples/js/controls/OrbitControls');
//		require('./emotedriver.js');
//		const Emodrv_1 = require('./emotedriver.js');
//		const Emodrv = Emodrv_1.Emodrv;

//		require('./emoteplayer.js');
//		const EmotePlayer = require('./emoteplayer.js');
//		const EmotePlayer = await import('./emoteplayer.js');
/*
console.log(`fn:index.ts line:23 EmotePlayer:%o`, EmotePlayer);
		// create hidden canvas for rendering
		EmotePlayer.createRenderCanvas(750, 500);
		// create new player
		const canvas = document.getElementById('cvsEmo');
		const player = new EmotePlayer(canvas);
		// load emote data from URL
		player.loadDataFromURL("prj/emote_layer/mat/emote_test2.emtbytes");
		// set chara scale
		player.scale = 0.5;
		// play test timeline
		player.mainTimelineLabel = 'sample_全自動_test';
*/
		//plgArg.addLayCls('emote', ()=> new EmoteLayer);
		// なぜか「type is missing the following properties ...」になるので any 逃げ
		plgArg.addLayCls('emote', ()=> {const l: any = new EmoteLayer; return l});
	})();
};
