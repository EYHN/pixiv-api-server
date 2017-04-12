"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var getIllustPage_1 = require("../lib/getIllustPage");
var illustDetail_1 = require("../lib/illustDetail");
require("babel-polyfill");
exports.illustDetail = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx) {
        var option;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.type = 'image/png';
                        ctx.status = 200;
                        option = {
                            size: getIllustPage_1.String2imageSizeE(ctx.query.size)
                        };
                        _context.next = 5;
                        return illustDetail_1.detailillust(option);

                    case 5:
                        ctx.response.body = _context.sent;

                    case 6:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();
exports.illustDetailsREST = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        ctx.type = 'application/json; charset=utf-8';
                        ctx.set('Cache-Control', 'max-age=31536000, public');
                        ctx.status = 200;
                        _context2.next = 5;
                        return illustDetail_1.getDetailillusts();

                    case 5:
                        _context2.t0 = _context2.sent;
                        ctx.response.body = {
                            data: _context2.t0
                        };

                    case 7:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x2) {
        return _ref2.apply(this, arguments);
    };
}();
//# sourceMappingURL=illustDetail.js.map
