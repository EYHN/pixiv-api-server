import cachedFetch from './cachedFetch';
import pixivimg from './pixiv-img';
import * as cheerio from 'cheerio';
import 'isomorphic-fetch';
import 'babel-polyfill';
const utils = require('utility');

interface pixivSlideshow {
  "pixivBackgroundSlideshow.illusts":{
    landscape?:{
      illust_id?:string,
      illust_title?:string,
      profile_img?:{
        main_s?:string,
        [key: string]:string
      },
      url:{[key: string]:string,medium?:string,"1200x1200"?:string},
      user_name?: string,
      www_member_illust_medium_url?:string,
      www_user_url?:string
    }[],
    portrait?:any[]
  }
}

export const pixivSlideshowIllusts = async ()=>{
  let req = await cachedFetch("http://www.pixiv.net/");
  let text = await req.text();
  let $ = cheerio.load(text);
  let data = JSON.parse($("input#init-config").attr("value")) as pixivSlideshow;
  return data["pixivBackgroundSlideshow.illusts"].landscape
}

export const pixivSlideshowIllustImg = async ()=>{
  let illusts = await pixivSlideshowIllusts();
  let illust = illusts[utils.random(illusts.length - 1)];
  return pixivimg(illust.url["1200x1200"]);
}