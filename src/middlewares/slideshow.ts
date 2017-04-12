import { pixivSlideshowIllustImg,pixivSlideshowIllusts } from '../lib/pixiv-slideshow-illusts';
import * as koa from 'koa';
import 'babel-polyfill';

export const slideshow = async (ctx:koa.Context)=>{
  ctx.type = 'text/plain; charset=utf-8';
  ctx.type = 'image/png';
  ctx.type = '.png';
  ctx.type = 'png';
  ctx.status = 200;
  ctx.response.body = await pixivSlideshowIllustImg();
}

export const slideshowREST = async (ctx:koa.Context)=>{
  ctx.type = 'application/json; charset=utf-8';
  ctx.status = 200;
  ctx.response.body = {data:await pixivSlideshowIllusts()};
}