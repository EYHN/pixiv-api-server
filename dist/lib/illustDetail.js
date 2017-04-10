"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var pixiv_img_1 = require("./pixiv-img");
var wait_1 = require("../util/wait");
var later = require("later");
var logger_1 = require("./logger");
var Pixiv = require("pixiv-app-api");
var utils = require('utility');
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

                    newIllusts.push.apply(newIllusts, _toConsumableArray(json.illusts));
                    _context.next = 11;
                    return wait_1.default(100);

                case 11:
                    if (!true) {
                        _context.next = 22;
                        break;
                    }

                    if (pixiv.hasNext()) {
                        _context.next = 14;
                        break;
                    }

                    return _context.abrupt("break", 22);

                case 14:
                    _context.next = 16;
                    return pixiv.next();

                case 16:
                    _json = _context.sent;

                    newIllusts.push.apply(newIllusts, _toConsumableArray(_json.illusts));
                    _context.next = 20;
                    return wait_1.default(100);

                case 20:
                    _context.next = 11;
                    break;

                case 22:
                    DetailIllusts = newIllusts;
                    logger_1.default.info('update detail illust finish !');
                    _context.next = 29;
                    break;

                case 26:
                    _context.prev = 26;
                    _context.t0 = _context["catch"](4);

                    logger_1.default.error(_context.t0, {
                        data: {
                            "newIllusts": newIllusts
                        }
                    }, 'update detail illust finish !');

                case 29:
                    updating = false;

                case 30:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined, [[4, 26]]);
}));
var defaultDetailIllustOption = {
    size: "medium"
};
exports.detailillust = function () {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultDetailIllustOption;

    var DetailIllustOption = Object.assign({}, defaultDetailIllustOption, option);
    if (DetailIllusts.length == 0) {
        exports.updateDetailIllust();
        return;
    }
    var Illust = DetailIllusts[utils.random(0, DetailIllusts.length - 1)];
    if (typeof Illust.imageUrls === "undefined") {
        exports.updateDetailIllust();
        return;
    }
    var imgsrc = Illust.imageUrls[DetailIllustOption.size];
    return pixiv_img_1.default(imgsrc);
};
exports.getDetailillusts = function () {
    return DetailIllusts;
};
//# sourceMappingURL=illustDetail.js.map
