"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThreeDLayer_1 = require("./ThreeDLayer");
exports.init = (plgArg) => {
    ThreeDLayer_1.ThreeDLayer.searchPath = plgArg.searchPath;
    (async () => {
        ThreeDLayer_1.ThreeDLayer.THREE = await Promise.resolve().then(() => require('three'));
        window.THREE = ThreeDLayer_1.ThreeDLayer.THREE;
        require('three/examples/js/controls/OrbitControls');
        plgArg.addLayCls('3d', () => new ThreeDLayer_1.ThreeDLayer);
    })();
};
//# sourceMappingURL=index.js.map