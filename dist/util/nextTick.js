"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nextTick = new Promise(function (resolve, reject) {
    process.nextTick(resolve);
});
exports.default = nextTick;
//# sourceMappingURL=nextTick.js.map
