"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var chaiM = require("chai");
var sinonChai = require("sinon-chai");
var chaiAsPromised = require("chai-as-promised");
var sinonM = require("sinon");
exports.chai = chaiM;
exports.chai.use(sinonChai);
exports.chai.use(chaiAsPromised);
exports.expect = exports.chai.expect;
exports.sinon = sinonM;
exports.sandbox = exports.sinon.sandbox.create();
//# sourceMappingURL=test.helper.js.map
