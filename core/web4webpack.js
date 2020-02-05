"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const hPlg = {};
const h = require('./plugin.js').default;
for (const nm in h) hPlg[nm] = require(`./plugin/${nm}/index.js`);

const {SysWeb} = require('skynovel/core/lib/sn/SysWeb');
const sys = new SysWeb(hPlg, {cur: 'prj/top/', dip: '{"expanding": false}'});
//const sys = new SysWeb(hPlg, {cur: 'prj/top/'});
window.runSN = (cur = 'top')=> sys.run(cur);
window.stopSN = ()=> sys.stop();


/*
const init = async ()=> {
	const hPlg = {};
//	const h = require('./plugin.js').default;
	const {default: h} = await import('./plugin.js');
//	for (const nm in h) hPlg[nm] = require(`./plugin/${nm}/index.js`);
	for (const nm in h) {
//		hPlg[nm] = require(`./plugin/${nm}/index.js`);
		hPlg[nm] = await import(`./plugin/${nm}/index.js`);
	}

	const {SysWeb} = require('skynovel/core/lib/sn/SysWeb');
//	const {SysWeb} = await import('skynovel/core/lib/sn/SysWeb');
	const sys = new SysWeb(hPlg, {cur: 'prj/top/', dip: '{"expanding": false}'});
	//const sys = new SysWeb_1.SysWeb(hPlg, {cur: 'prj/top/'});
	window.runSN = (cur = 'top')=> sys.run(cur);
	window.stopSN = ()=> sys.stop();

console.log(`fn:web4webpack.js line:32 Ok.`);
};
init();
*/
