import * as stream from 'stream';
import pixivimg from './pixiv-img';
import { expect, sandbox } from '../testhelper/test.helper';
import * as fetchMock from 'fetch-mock';
import { Readable } from "stream";
import concat = require("concat-stream");

describe('pixiv-img', () => {
  let fetchURL = "https://huaji8.top/";
  let data = "data"
  beforeEach(() => {
    fetchMock.getOnce("https://huaji8.top/",data,{
      headers:{
        Referer: 'http://www.pixiv.net/'
      }
    } as any)
  });

  afterEach(() => {
    fetchMock.reset()
  });

  it("fetch pixiv img", (done) => {
    pixivimg(fetchURL).then((res)=>{
      expect(res).to.be.instanceOf(Readable);
      res.pipe(concat((buf)=>{
        expect(buf.toString()).to.be.eql("data")
        done();
      }))
    });
  })
})