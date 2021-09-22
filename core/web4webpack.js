"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 変更後は「npm run webpack:dev」

const hPlg = {};
import h from './plugin.js';
for (const nm in h) hPlg[nm] = require(`./plugin/${nm}`);

const dip = {'expanding': false};
let pcur = 'prj/';
if (location.pathname.slice(-15) == '/index_app.html') {
	pcur = '';
	dip['oninit_run'] = false;
}
import {SysWeb} from '@famibee/skynovel/web';
const sys = new SysWeb(hPlg, {cur: pcur +'top/', dip: JSON.stringify(dip)});
globalThis.runSN = (cur = pcur +'top')=> sys.runSN(cur);
globalThis.stopSN = ()=> sys.stop();
