"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThreeDLayer_1 = require("./ThreeDLayer");
exports.init = (plgArg) => {
    ThreeDLayer_1.ThreeDLayer.plgArg = plgArg;
    (async () => {
        ThreeDLayer_1.ThreeDLayer.THREE = await Promise.resolve().then(() => require('three'));
        globalThis.THREE = ThreeDLayer_1.ThreeDLayer.THREE;
        plgArg.addLayCls('3d', () => new ThreeDLayer_1.ThreeDLayer);
    })();
};
//# sourceMappingURL=index.js.map