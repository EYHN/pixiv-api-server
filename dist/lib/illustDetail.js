"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var wait_1 = require("../util/wait");
var later = require("later");
var logger_1 = require("./logger");
var Pixiv = require("pixiv-app-api");
var pixiv = new Pixiv();
var DetailIllusts = [];
var updating = false;
exports.setUpdateTimer = function (onHour) {
    var complexSched = later.parse.recur().on(onHour).hour();
    return later.setInterval(exports.updateDetailIllust, complexSched);
};
exports.updateDetailIllust = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var newIllusts, json, _json;

    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    newIllusts = new Array();

                    if (!updating) {
                        _context.next = 3;
                        break;
                    }

                    return _context.abrupt("return");

                case 3:
                    updating = true;
                    _context.prev = 4;
                    _context.next = 7;
                    return pixiv.illustRanking();

                case 7:
                    json = _context.sent;

                    newIllusts.push(json);

                case 9:
                    if (!true) {
                        _context.next = 20;
                        break;
                    }

                    if (pixiv.hasNext()) {
                        _context.next = 12;
                        break;
                    }

                    return _context.abrupt("break", 20);

                case 12:
                    _context.next = 14;
                    return pixiv.next();

                case 14:
                    _json = _context.sent;

                    newIllusts.push(_json);
                    _context.next = 18;
                    return wait_1.default(100);

                case 18:
                    _context.next = 9;
                    break;

                case 20:
                    DetailIllusts = newIllusts;
                    logger_1.default.info('update detail illust finish !');
                    _context.next = 27;
                    break;

                case 24:
                    _context.prev = 24;
                    _context.t0 = _context["catch"](4);

                    logger_1.default.error(_context.t0, { data: {
                            "newIllusts": newIllusts
                        } }, 'update detail illust finish !');

                case 27:
                    updating = false;

                case 28:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined, [[4, 24]]);
}));
exports.detailillust = function () {};
//# sourceMappingURL=illustDetail.js.map
