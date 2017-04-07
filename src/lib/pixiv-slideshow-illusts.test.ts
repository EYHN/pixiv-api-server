import { expect, sandbox } from '../testhelper/test.helper';
import { pixivBackgroundSlideshow, pixivSlideshowIllustImg, pixivSlideshowIllusts } from './pixiv-slideshow-illusts';
import * as pixivSlideshowIllustsO from './pixiv-slideshow-illusts';
import * as fetchMock from 'fetch-mock';
import * as pixivimg from "./pixiv-img"

describe('pixiv-slideshow-illusts', () => {
  const data: pixivBackgroundSlideshow = {
    "pixivBackgroundSlideshow.illusts": {
      portrait: [],
      landscape: [
        {
          url: {
            "1200x1200": "https:\/\/i.pximg.net\/img-master\/img\/2013\/07\/08\/01\/50\/25\/36919122_p0_master1200.jpg"
          }
        },
        {
          url:
          {
            "1200x1200": "https:\/\/i.pximg.net\/img-master\/img\/2011\/02\/21\/14\/30\/27\/16848987_p0_master1200.jpg"
          }
        }
      ]
    }
  };
  const html = `
  <input id="init-config" value='${JSON.stringify(data)}'/>
  `
  beforeEach(() => {
    fetchMock.getOnce("http://www.pixiv.net/", html)
  });

  afterEach(() => {
    fetchMock.reset()
    sandbox.restore()
  });

  it("return pixivBackgroundSlideshow.illusts from input in the html ", (done) => {
    pixivSlideshowIllusts().then((res)=>{
      expect(res).to.be.deep.equal(data["pixivBackgroundSlideshow.illusts"].landscape);
      done();
    })
  })

  it("get pixivimg from pixivSlideshowIllusts()", (done) => {
    let pixivimgStub = sandbox.stub(pixivimg,"default");
    let pixivSlideshowIllustsFunc = sandbox.stub(pixivSlideshowIllustsO,"default");
    pixivSlideshowIllustsFunc.returnValue(new Promise((resolve,reject)=>{
      resolve([
        {
          url: {
            "1200x1200": "321"
          }
        },
        {
          url:
          {
            "1200x1200": "123"
          }
        }
      ])
    }))
    pixivimgStub.returnValue(new Promise((resolve,reject)=>{
      resolve({a:1})
    }))
    pixivSlideshowIllustImg().then((res) => {
      console.log(res);
    });
    expect(pixivSlideshowIllustsFunc).to.be.calledOnce;
    expect(pixivimgStub).to.be.calledOnce;
  })
})