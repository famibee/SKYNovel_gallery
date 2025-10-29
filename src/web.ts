/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {HPlugin} from '@famibee/skynovel';
const hPlg: HPlugin = {};
import h from './plugin.json';

globalThis.addEventListener('DOMContentLoaded', async ()=> {
	for (const nm in h) hPlg[nm] = await import(`./plugin/${nm}/index.ts`);

	const dip: {expanding: boolean, oninit_run?: boolean} = {expanding: false};
	let pcur = 'prj/';
	if (location.pathname.endsWith('/index_app.html')) {
		pcur = '';
		dip.oninit_run = false;
	}

	const {SysWeb} = await import('@famibee/skynovel');
	const sys = new SysWeb(hPlg, {cur: pcur +'top/', crypto: false, dip: JSON.stringify(dip)});	// 拡張機能で【(hPlg);】置換するので触らない
	(<any>globalThis).runSN = (cur = pcur +'top')=> sys.runSN(cur);
	(<any>globalThis).stopSN = ()=> sys.stop();

}, {once: true, passive: true});
