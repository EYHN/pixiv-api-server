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
   * @api {get} /pximg Pixiv图片代理
   * @apiName getPximg
   * @apiGroup pixiv
   * 
   * @apiDescription 
   * 
   * <a href="https://lit-brushlands-42343.herokuapp.com/pximg?src=https://i.pximg.net/img-original/img/2017/04/05/00/00/02/62258773_p0.png">https://lit-brushlands-42343.herokuapp.com/pximg?src=https://i.pximg.net/img-original/img/2017/04/05/00/00/02/62258773_p0.png</a>
   *
   * @apiParam {String} src 图片的链接.
   */
  router.get('/pximg', pximg)

  /**
   * @api {get} /slideshow Pixiv幻灯片
   * @apiName GetSlideshow
   * @apiGroup pixiv
   * @apiDescription 
   * 
   * <a href="https://lit-brushlands-42343.herokuapp.com/slideshow">https://lit-brushlands-42343.herokuapp.com/slideshow</a>
   *
   */
  router.get('/slideshow', slideshow)

  /**
   * @api {POST} /slideshow Pixiv幻灯片 json数据
   * @apiName getPximgREST
   * @apiGroup pixiv
   * @apiSampleRequest https://lit-brushlands-42343.herokuapp.com/slideshow
   * 
   * @apiSuccess {Object[]} data json数据.
   */
  router.post('/slideshow', slideshowREST)

  /**
   * @api {get} /illustDetail Pixiv日排行榜
   * @apiName GetIllustDetail
   * @apiGroup pixiv
   * 
   * @apiDescription 
   * <a href="https://lit-brushlands-42343.herokuapp.com/illustDetail?size=original">https://lit-brushlands-42343.herokuapp.com/illustDetail?size=original</a>
   * 
   * @apiParam {String} size 图片的大小 "squareMedium" | "medium" | "large" | "original"
   */
  router.get('/illustDetail', illustDetail)

  /**
   * @api {POST} /slideshow Pixiv日排行榜 json数据
   * @apiName GetIllustDetailREST
   * @apiGroup pixiv
   * 
   * @apiSampleRequest https://lit-brushlands-42343.herokuapp.com/slideshow
   * 
   * @apiSuccess {Object[]} data json数据.
   */
  router.post('/illustDetail', illustDetailsREST)

  app.use(log);

  app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    await next();
  })

  app
    .use(router.routes())
    .use(router.allowedMethods());
}

export default InjectionMiddlewares;