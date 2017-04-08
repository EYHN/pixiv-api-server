"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var illustDetail_1 = require("./lib/illustDetail");
var middlewares_1 = require("./middlewares");
var setupNconf_1 = require("./lib/setupNconf");
var http = require("http");
var koa = require("koa");
var Nconf = require("nconf");
var logger_1 = require("./lib/logger");
require("babel-polyfill");
var R = require("ramda");
//read config.cson
setupNconf_1.default();
var app = new koa();
middlewares_1.default(app);
Nconf.set("port", process.env["PORT"] || 3000);
var port = Nconf.get("port");
illustDetail_1.updateDetailIllust().then(illustDetail_1.setUpdateTimer.call(illustDetail_1.setUpdateTimer, Nconf.get("UpdateDetailHour") | 5));
http.createServer(app.callback()).listen(port, function () {
    logger_1.default.info("Express server listening on port " + port);
});
//# sourceMappingURL=main.js.map
