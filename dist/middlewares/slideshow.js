"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var pixiv_slideshow_illusts_1 = require("../lib/pixiv-slideshow-illusts");
require("babel-polyfill");
var slideshow = function () {
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

    return function slideshow(_x) {
        return _ref.apply(this, arguments);
    };
}();
exports.default = slideshow;
//# sourceMappingURL=slideshow.js.map
