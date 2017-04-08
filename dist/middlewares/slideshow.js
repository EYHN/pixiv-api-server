"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var pixiv_slideshow_illusts_1 = require("../lib/pixiv-slideshow-illusts");
require("babel-polyfill");
exports.slideshow = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.type = 'text/plain; charset=utf-8';
                        ctx.type = 'image/png';
                        ctx.type = '.png';
                        ctx.type = 'png';
                        ctx.status = 200;
                        _context.next = 7;
                        return pixiv_slideshow_illusts_1.pixivSlideshowIllustImg();

                    case 7:
                        ctx.response.body = _context.sent;

                    case 8:
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
exports.slideshowREST = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        ctx.type = 'application/json; charset=utf-8';
                        ctx.status = 200;
                        _context2.next = 4;
                        return pixiv_slideshow_illusts_1.pixivSlideshowIllusts();

                    case 4:
                        ctx.response.body = _context2.sent;

                    case 5:
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
//# sourceMappingURL=slideshow.js.map
