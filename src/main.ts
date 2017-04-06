import setupNconf from './lib/setupNconf';
import * as http from 'http';
import * as koa from 'koa';
import * as Nconf from 'nconf'
import logger from './lib/logger'
import 'babel-polyfill';
import pixivimg from './lib/pixiv-img';

//read config.cson
setupNconf();

const app = new koa();

const port = Nconf.get("port") || 3000;

app.use(async (ctx,next) => {
  let stream = await pixivimg("https://i.pximg.net/img-original/img/2017/04/04/00/57/17/62244048_p0.jpg")
  ctx.type = 'text/plain; charset=utf-8';
  ctx.type = 'image/png';
  ctx.type = '.png';
  ctx.type = 'png';
  ctx.response.body = stream;
  next()
});

http.createServer(app.callback()).listen(port,()=>{
  logger.info(`Express server listening on port ${port}`);
});