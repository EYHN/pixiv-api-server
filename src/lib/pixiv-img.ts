import { Readable } from 'stream';
import { encode } from 'punycode';
const path = require('path');
const fs = require('fs');
import "isomorphic-fetch"

const pixivimg = (imgUrl:string) => {
  return new Promise<Readable>((resolve, reject)=>{
    if (typeof imgUrl !== 'string') {
			reject(new TypeError('Expected a string'));
		}
    resolve(fetch(imgUrl,{
      headers:{
        Referer: 'http://www.pixiv.net/'
      }
    }).then((res)=>{
      return <Readable><any> res.body
    }))
  })
}

export default pixivimg;