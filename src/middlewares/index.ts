import { illustDetail, illustDetailsREST } from './illustDetail';
import { slideshow, slideshowREST } from './slideshow';
import log from './log';
import pximg from './pximg';
import * as koa from 'koa';
import * as Router from 'koa-router';
import 'babel-polyfill';

const InjectionMiddlewares = (app: koa) => {
  const router = new Router();

/**
 * @api {get} /pximg Pixiv图片反向代理
 * @apiName getPximg
 * @apiGroup pixiv
 *
 * @apiParam {String} src 图片的链接.
 */
  router.get('/pximg', pximg)

/**
 * @api {get} /slideshow Pixiv幻灯片
 * @apiName GetSlideshow
 * @apiGroup pixiv
 *
 */
  router.get('/slideshow', slideshow)

/**
 * @api {POST} /slideshow Pixiv幻灯片 json数据
 * @apiName getPximgREST
 * @apiGroup pixiv
 * @apiSampleRequest https://lit-brushlands-42343.herokuapp.com/pximg
 * 
 * @apiSuccess {Object[]} data json数据.
 */
  router.post('/slideshow', slideshowREST)

/**
 * @api {get} /slideshow Pixiv日排行榜
 * @apiName GetIllustDetail
 * @apiGroup pixiv
 */
  router.get('/illustDetail', illustDetail)

/**
 * @api {POST} /slideshow Pixiv日排行榜 json数据
 * @apiName GetIllustDetailREST
 * @apiGroup pixiv
 * 
 * @apiSuccess {Object[]} data json数据.
 */
  router.post('/illustDetail', illustDetailsREST)

  app.use(log);

  app.use((ctx)=>{
    ctx.set("Access-Control-Allow-Origin","*");
  })

  app
    .use(router.routes())
    .use(router.allowedMethods());
}

export default InjectionMiddlewares;