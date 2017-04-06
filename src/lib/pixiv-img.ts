import * as stream from 'stream';
import { encode } from 'punycode';
const path = require('path');
const fs = require('fs');
import * as fetch from "isomorphic-fetch"

const pixivimg = (imgUrl:string) => {
  return new Promise<stream>((resolve, reject)=>{
    if (typeof imgUrl !== 'string') {
			reject(new TypeError('Expected a string'));
		}
    resolve(fetch(imgUrl,{
      headers:{
        Referer: 'http://www.pixiv.net/'
      }
    }).then((res)=>{
      return <stream><any> res.body
    }))
  })
}

export default pixivimg;