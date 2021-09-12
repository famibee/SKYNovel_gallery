"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const ThreeDLayer_1 = require("./ThreeDLayer");
async function init(hIA) {
    ThreeDLayer_1.ThreeDLayer.plgArg = hIA;
    ThreeDLayer_1.ThreeDLayer.THREE = await Promise.resolve().then(() => require('three'));
    globalThis.THREE = ThreeDLayer_1.ThreeDLayer.THREE;
    hIA.addLayCls('3d', () => new ThreeDLayer_1.ThreeDLayer);
}
exports.init = init;
;
//# sourceMappingURL=index.js.map