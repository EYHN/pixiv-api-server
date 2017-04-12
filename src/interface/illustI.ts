import { userI } from './userI';
import { imageUrlsI } from './imageUrlsI';
export interface illustI {
  id:number,
  title:string,
  type:"illust"|string,
  imageUrls:imageUrlsI,
  caption:string,
  restrict:string,
  user:userI,
  tags:tagI,
  tools:string[],
  createDate:string,
  pageCount:number,
  width:number,
  height:number,
  sanityLevel: number,
  metaSinglePage:{
    originalImageUrl:string
  },
  metaPages:{imageUrls:imageUrlsI}[],
  totalView:number,
  totalBookmarks:number,
  isBookmarked:boolean,
  visible:boolean,
  isMuted:boolean
}