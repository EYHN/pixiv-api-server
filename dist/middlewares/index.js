"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var illustDetail_1 = require("./illustDetail");
var slideshow_1 = require("./slideshow");
var log_1 = require("./log");
var pximg_1 = require("./pximg");
var Router = require("koa-router");
require("babel-polyfill");
var InjectionMiddlewares = function InjectionMiddlewares(app) {
  var router = new Router();
  /**
   * @api {get} /pximg Pixiv图片反向代理
   * @apiName getPximg
   * @apiGroup pixiv
   *
   * @apiParam {String} src 图片的链接.
   */
  router.get('/pximg', pximg_1.default);
  /**
   * @api {get} /slideshow Pixiv幻灯片
   * @apiName GetSlideshow
   * @apiGroup pixiv
   *
   */
  router.get('/slideshow', slideshow_1.slideshow);
  /**
   * @api {POST} /slideshow Pixiv幻灯片 json数据
   * @apiName getPximgREST
   * @apiGroup pixiv
   * @apiSampleRequest https://lit-brushlands-42343.herokuapp.com/pximg
   *
   * @apiSuccess {Object[]} data json数据.
   */
  router.post('/slideshow', slideshow_1.slideshowREST);
  /**
   * @api {get} /slideshow Pixiv日排行榜
   * @apiName GetIllustDetail
   * @apiGroup pixiv
   */
  router.get('/illustDetail', illustDetail_1.illustDetail);
  /**
   * @api {POST} /slideshow Pixiv日排行榜 json数据
   * @apiName GetIllustDetailREST
   * @apiGroup pixiv
   *
   * @apiSuccess {Object[]} data json数据.
   */
  router.post('/illustDetail', illustDetail_1.illustDetailsREST);
  app.use(log_1.default);
  app.use(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ctx.set("Access-Control-Allow-Origin", "*");
              _context.next = 3;
              return next();

            case 3:
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
  app.use(router.routes()).use(router.allowedMethods());
};
exports.default = InjectionMiddlewares;
//# sourceMappingURL=index.js.map
