"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const Cubism3Layer_1 = require("./Cubism3Layer");
async function init(pia) {
    pia.addLayCls('cubism3', () => new Cubism3Layer_1.Cubism3Layer);
}
exports.init = init;
;
//# sourceMappingURL=index.js.map