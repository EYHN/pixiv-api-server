import pixivimg from '../lib/pixiv-img';
import * as koa from 'koa';
import 'babel-polyfill';

const pximg = async (ctx:koa.Context)=>{
  ctx.type = 'image/png';
  ctx.set('Cache-Control', 'max-age=31536000, public');
  ctx.set('ETag', ctx.request.query.src);
  ctx.status = 200;
  if (ctx.fresh) {
    ctx.status = 304;
    return;
  }
  ctx.response.body = await pixivimg(ctx.request.query.src);
}

export default pximg;