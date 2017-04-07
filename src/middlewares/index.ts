import log from './log';
import pximg from './pximg';
import * as koa from 'koa';
import * as Router from 'koa-router';

const InjectionMiddlewares = (app: koa) => {
  const router = new Router();
  router.get('/pximg', pximg)

  app.use(log);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}

export default InjectionMiddlewares;