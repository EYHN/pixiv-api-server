import { String2imageSizeE } from '../lib/getIllustPage';
import { detailillust, getDetailillusts } from '../lib/illustDetail';
import * as koa from 'koa';
import 'babel-polyfill';


export const illustDetail = async (ctx:koa.Context)=>{
  ctx.type = 'image/png';
  ctx.status = 200;
  let option = {
    size: String2imageSizeE(ctx.query.size)
  };
  ctx.response.body = await detailillust(option);
}

export const illustDetailsREST = async (ctx:koa.Context)=>{
  ctx.type = 'application/json; charset=utf-8';
  ctx.set('Cache-Control', 'max-age=31536000, public');
  ctx.status = 200;
  ctx.response.body = {data:await getDetailillusts()};
}