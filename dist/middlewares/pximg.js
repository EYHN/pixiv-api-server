"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var pixiv_img_1 = require("../lib/pixiv-img");
require("babel-polyfill");
var pximg = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.type = 'text/plain; charset=utf-8';
                        ctx.type = 'image/png';
                        ctx.type = '.png';
                        ctx.type = 'png';
                        ctx.set('Cache-Control', 'max-age=31536000, public');
                        ctx.set('ETag', ctx.request.query.src);
                        ctx.status = 200;

                        if (!ctx.fresh) {
                            _context.next = 10;
                            break;
                        }

                        ctx.status = 304;
                        return _context.abrupt("return");

                    case 10:
                        _context.next = 12;
                        return pixiv_img_1.default(ctx.request.query.src);

                    case 12:
                        ctx.response.body = _context.sent;

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function pximg(_x) {
        return _ref.apply(this, arguments);
    };
}();
exports.default = pximg;
//# sourceMappingURL=pximg.js.map
