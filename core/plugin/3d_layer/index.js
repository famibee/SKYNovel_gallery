"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThreeDLayer_1 = require("./ThreeDLayer");
exports.init = (plgArg) => {
    ThreeDLayer_1.ThreeDLayer.plgArg = plgArg;
    (async () => {
        ThreeDLayer_1.ThreeDLayer.THREE = await Promise.resolve().then(() => require('three'));
        window.THREE = ThreeDLayer_1.ThreeDLayer.THREE;
        plgArg.addLayCls('3d', () => { const l = new ThreeDLayer_1.ThreeDLayer; return l; });
    })();
};
//# sourceMappingURL=index.js.map