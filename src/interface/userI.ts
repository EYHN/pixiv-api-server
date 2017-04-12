import { imageUrlsI } from './imageUrlsI';
export interface userI {
  id:number,
  name:string,
  account: "tokitoruo"|string,
  profileImageUrls:imageUrlsI,
  isFollowed:boolean
}