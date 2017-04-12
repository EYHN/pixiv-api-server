"use strict";

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
  app.use(function (ctx) {
    ctx.set("Access-Control-Allow-Origin", "*");
  });
  app.use(router.routes()).use(router.allowedMethods());
};
exports.default = InjectionMiddlewares;
//# sourceMappingURL=index.js.map
