import InjectionMiddlewares from './middlewares';
import setupNconf from './lib/setupNconf';
import * as http from 'http';
import * as koa from 'koa';
import * as Nconf from 'nconf';
import logger from './lib/logger'
import 'babel-polyfill';


//read config.cson
setupNconf();

const app = new koa();

InjectionMiddlewares(app);

const port = Nconf.get("port") || 3000;

http.createServer(app.callback()).listen(port,()=>{
  logger.info(`Express server listening on port ${port}`);
});