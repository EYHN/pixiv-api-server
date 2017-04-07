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
var Router = require("koa-router");
//read config.cson
setupNconf_1.default();
var app = new koa();
var router = new Router();
var port = Nconf.get("port") || 3000;
router.get('/pximg', function () {
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

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());
app.use(function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var start, ms;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        start = new Date();
                        _context2.next = 3;
                        return next();

                    case 3:
                        ms = new Date().getTime() - start.getTime();

                        console.log(ctx.method + " " + ctx.url + " - " + ms);

                    case 5:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}());
app.use(router.routes()).use(router.allowedMethods());
http.createServer(app.callback()).listen(port, function () {
    logger_1.default.info("Express server listening on port " + port);
});
//# sourceMappingURL=main.js.map
