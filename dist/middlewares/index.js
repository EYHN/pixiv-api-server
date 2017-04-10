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
    router.get('/pximg', pximg_1.default);
    router.get('/slideshow', slideshow_1.slideshow);
    router.post('/slideshow', slideshow_1.slideshowREST);
    router.get('/illustDetail', illustDetail_1.illustDetail);
    router.post('/illustDetail', illustDetail_1.illustDetailsREST);
    app.use(log_1.default);
    app.use(router.routes()).use(router.allowedMethods());
};
exports.default = InjectionMiddlewares;
//# sourceMappingURL=index.js.map
