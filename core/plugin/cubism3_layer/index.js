"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cubism3Layer_1 = require("./Cubism3Layer");
exports.init = (plgArg) => {
    Cubism3Layer_1.Cubism3Layer.plgArg = plgArg;
    (async () => {
        plgArg.addLayCls('cubism3', () => { const l = new Cubism3Layer_1.Cubism3Layer; return l; });
    })();
};
//# sourceMappingURL=index.js.map