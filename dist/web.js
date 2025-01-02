"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hPlg = {};
const plugin_json_1 = __importDefault(require("./plugin.json"));
globalThis.addEventListener('DOMContentLoaded', async () => {
    for (const nm in plugin_json_1.default)
        hPlg[nm] = await Promise.resolve(`${`./plugin/${nm}/index.ts`}`).then(s => __importStar(require(s)));
    const dip = { expanding: false };
    let pcur = 'prj/';
    if (location.pathname.endsWith('/index_app.html')) {
        pcur = '';
        dip.oninit_run = false;
    }
    const { SysWeb } = await Promise.resolve().then(() => __importStar(require('@famibee/skynovel')));
    const sys = new SysWeb(hPlg, { cur: pcur + 'top/', crypto: false, dip: JSON.stringify(dip) });
    globalThis.runSN = (cur = pcur + 'top') => sys.runSN(cur);
    globalThis.stopSN = () => sys.stop();
}, { once: true, passive: true });
//# sourceMappingURL=web.js.map