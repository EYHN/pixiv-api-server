import slideshow from './slideshow';
import log from './log';
import pximg from './pximg';
import * as koa from 'koa';
import * as Router from 'koa-router';
import 'babel-polyfill';

const InjectionMiddlewares = (app: koa) => {
  const router = new Router();
  router.get('/pximg', pximg)
  router.get('/slideshow', slideshow)

  app.use(log);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}

export default InjectionMiddlewares;