import wait from '../util/wait';
import * as later from 'later';
import logger from "./logger"
const Pixiv = require("pixiv-app-api")

const pixiv = new Pixiv();

let DetailIllusts = [];

let updating = false;

export const setUpdateTimer = (onHour:number)=>{
  let complexSched = later.parse.recur().on(onHour).hour();
  return later.setInterval(updateDetailIllust,complexSched);
}

export const updateDetailIllust = async ()=>{
  let newIllusts = new Array();
  if(updating){
    return;
  }
  updating = true;
  try{
    const json = await pixiv.illustRanking();
    newIllusts.push(json);
    while (true) { // eslint-disable-line no-constant-condition
      if (!pixiv.hasNext()) {
        break;
      }
      const json = await pixiv.next();
      newIllusts.push(json);
      await wait(100);
    }
    DetailIllusts = newIllusts;
    logger.info('update detail illust finish !');
  }catch(err){
    logger.error(err,{data:{
      "newIllusts":newIllusts
    }},'update detail illust finish !');
  }
  updating = false;
}

export const detailillust = ()=>{

}