"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThreeDLayer_1 = require("./ThreeDLayer");
exports.init = (plgArg) => {
    ThreeDLayer_1.ThreeDLayer.plgArg = plgArg;
    (async () => {
        ThreeDLayer_1.ThreeDLayer.THREE = await Promise.resolve().then(() => require('three'));
        ThreeDLayer_1.ThreeDLayer.THREE.GLTFLoader = await Promise.resolve().then(() => require('three-gltf-loader'));
        window.THREE = ThreeDLayer_1.ThreeDLayer.THREE;
        require('three/examples/js/controls/OrbitControls');
        plgArg.addLayCls('3d', () => { const l = new ThreeDLayer_1.ThreeDLayer; return l; });
    })();
};
//# sourceMappingURL=index.js.map