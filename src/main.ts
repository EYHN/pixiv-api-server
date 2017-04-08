import { setUpdateTimer, updateDetailIllust } from './lib/illustDetail';
import InjectionMiddlewares from './middlewares';
import setupNconf from './lib/setupNconf';
import * as http from 'http';
import * as koa from 'koa';
import * as Nconf from 'nconf';
import logger from './lib/logger'
import 'babel-polyfill';
const R = require("ramda")


//read config.cson
setupNconf();

const app = new koa();

InjectionMiddlewares(app);

Nconf.set("port",process.env["PORT"] || 3000)

const port = Nconf.get("port");

updateDetailIllust().then(setUpdateTimer.call(setUpdateTimer,Nconf.get("UpdateDetailHour") | 5))

http.createServer(app.callback()).listen(port,()=>{
  logger.info(`Express server listening on port ${port}`);
});