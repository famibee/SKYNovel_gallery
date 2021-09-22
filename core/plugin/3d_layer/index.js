"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const ThreeDLayer_1 = require("./ThreeDLayer");
async function init(pia) {
    pia.addLayCls('3d', () => new ThreeDLayer_1.ThreeDLayer(pia));
    return ThreeDLayer_1.ThreeDLayer.init();
}
exports.init = init;
;
//# sourceMappingURL=index.js.map