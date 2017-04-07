import logger from '../lib/logger';
import * as koa from 'koa';

const log:koa.Middleware = async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date().getTime() - start.getTime();
  logger.info(`${ctx.method} ${ctx.url} - ${ms}`);
}

export default log;