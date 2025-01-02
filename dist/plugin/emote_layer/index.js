"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const EmoteLayer_1 = require("./EmoteLayer");
async function init(pia) {
    pia.addLayCls('emote', () => new EmoteLayer_1.EmoteLayer(pia));
}
;
//# sourceMappingURL=index.js.map