//@ts-check
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const hPlg = {};
const h = require('./plugin.js').default;
for (const nm in h) hPlg[nm] = require(`./plugin/${nm}/index.js`);

const {SysWeb} = require('skynovel/core/lib/sn/SysWeb');
const dip = {'expanding': false};
let pcur = 'prj/';
if (location.pathname.slice(-15) == '/index_app.html') {
	pcur = '';
	dip['oninit_run'] = false;
}
//@ts-ignore
const sys = new SysWeb(hPlg, {cur: pcur +'top/', dip: JSON.stringify(dip)});
globalThis.runSN = (cur = pcur +'top')=> sys.run(cur);
globalThis.stopSN = ()=> sys.stop();
