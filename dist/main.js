"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var setupNconf_1 = require("./lib/setupNconf");
var http = require("http");
var koa = require("koa");
var Nconf = require("nconf");
var logger_1 = require("./lib/logger");
require("babel-polyfill");
var pixiv_img_1 = require("./lib/pixiv-img");
//read config.cson
setupNconf_1.default();
var app = new koa();
var port = Nconf.get("port") || 3000;
app.use(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var stream;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return pixiv_img_1.default("https://i.pximg.net/img-original/img/2017/04/04/00/57/17/62244048_p0.jpg");

                    case 2:
                        stream = _context.sent;

                        ctx.type = 'text/plain; charset=utf-8';
                        ctx.type = 'image/png';
                        ctx.type = '.png';
                        ctx.type = 'png';
                        ctx.response.body = stream;
                        next();

                    case 9:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());
http.createServer(app.callback()).listen(port, function () {
    logger_1.default.info("Express server listening on port " + port);
});
//# sourceMappingURL=main.js.map
