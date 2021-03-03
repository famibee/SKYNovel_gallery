"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmoteLayer_1 = require("./EmoteLayer");
exports.init = (plgArg) => {
    EmoteLayer_1.EmoteLayer.plgArg = plgArg;
    (async () => {
        plgArg.addLayCls('emote', () => new EmoteLayer_1.EmoteLayer);
    })();
};
//# sourceMappingURL=index.js.map