"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var fetch = require("isomorphic-fetch");
var cheerio = require("cheerio");
require("babel-polyfill");
exports.pixivWelIllusts = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var req, text, $, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return fetch("http://www.pixiv.net/");

                case 2:
                    req = _context.sent;
                    _context.next = 5;
                    return req.text();

                case 5:
                    text = _context.sent;
                    $ = cheerio.load(text);
                    data = JSON.parse($("input#init-config").attr("value"));
                    return _context.abrupt("return", data["pixivBackgroundSlideshow.illusts"].landscape);

                case 9:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}));
//# sourceMappingURL=pixiv-welcome-illusts.js.map
