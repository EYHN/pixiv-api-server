import { detailillust } from '../lib/illustDetail';
import * as koa from 'koa';
import 'babel-polyfill';


export const illustDetail = async (ctx:koa.Context)=>{
  ctx.type = 'image/png';
  ctx.status = 200;
  ctx.response.body = await detailillust();
}