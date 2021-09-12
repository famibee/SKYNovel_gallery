"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const EmoteLayer_1 = require("./EmoteLayer");
async function init(hIA) {
    EmoteLayer_1.EmoteLayer.plgArg = hIA;
    hIA.addLayCls('emote', () => new EmoteLayer_1.EmoteLayer);
}
exports.init = init;
;
//# sourceMappingURL=index.js.map