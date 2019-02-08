"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmoteLayer_1 = require("./EmoteLayer");
exports.init = (plgArg) => {
    EmoteLayer_1.EmoteLayer.plgArg = plgArg;
    (async () => {
        plgArg.addLayCls('emote', () => { const l = new EmoteLayer_1.EmoteLayer; return l; });
    })();
};
//# sourceMappingURL=index.js.map