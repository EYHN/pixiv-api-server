import pixivimg from './pixiv-img';
import wait from '../util/wait';
import * as later from 'later';
import logger from "./logger"
const Pixiv = require("pixiv-app-api")
const utils = require('utility');

const pixiv = new Pixiv();

let DetailIllusts: any = [];

let updating = false;

export const setUpdateTimer = (onHour: number) => {
  let complexSched = later.parse.recur().on(onHour).hour();
  return later.setInterval(updateDetailIllust, complexSched);
}

export const updateDetailIllust = async () => {
  let newIllusts = new Array();
  if (updating) {
    return;
  }
  updating = true;
  try {
    const json = await pixiv.illustRanking();
    newIllusts.push(...json.illusts);
    await wait(100);
    while (true) { // eslint-disable-line no-constant-condition
      if (!pixiv.hasNext()) {
        break;
      }
      const json = await pixiv.next();
      newIllusts.push(...json.illusts);
      await wait(100);
    }
    DetailIllusts = newIllusts;
    logger.info('update detail illust finish !');
  } catch (err) {
    logger.error(err, {
      data: {
        "newIllusts": newIllusts
      }
    }, 'update detail illust finish !');
  }
  updating = false;
}

interface detailillustI {
  size?: "squareMedium" | "medium" | "large",
}

const defaultDetailIllustOption: detailillustI = {
  size: "medium"
}

export const detailillust = (option: detailillustI = defaultDetailIllustOption) => {
  let DetailIllustOption = {
    ...defaultDetailIllustOption,
    ...option
  }
  if (DetailIllusts.length == 0) {
    updateDetailIllust();
    return
  }
  let Illust = DetailIllusts[utils.random(0, DetailIllusts.length - 1)];
  if (typeof Illust.imageUrls === "undefined") {
    updateDetailIllust();
    return
  }
  let imgsrc = Illust.imageUrls[DetailIllustOption.size];
  return pixivimg(imgsrc);
}

export const getDetailillusts = () => {
  return DetailIllusts;
}