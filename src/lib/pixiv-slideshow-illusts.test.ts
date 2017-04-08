import { expect, sandbox } from '../testhelper/test.helper';
import { pixivSlideshowIllustImg, pixivSlideshowIllusts } from './pixiv-slideshow-illusts';
import * as pixivSlideshowIllustsO from './pixiv-slideshow-illusts';
import * as fetchMock from 'fetch-mock';
import * as pixivimg from "./pixiv-img"

describe('pixiv-slideshow-illusts', () => {
  const data = {
    "pixivBackgroundSlideshow.illusts": {
      portrait: new Array,
      landscape: [
        { url: { "1200x1200": "123" } },
        { url: { "1200x1200": "123" } },
        { url: { "1200x1200": "123" } },
        { url: { "1200x1200": "123" } },
        { url: { "1200x1200": "123" } },
        { url: { "1200x1200": "123" } },
        { url: { "1200x1200": "321" } },
        { url: { "1200x1200": "1111" } }
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
    pixivSlideshowIllusts().then((res) => {
      expect(res).to.be.deep.equal(data["pixivBackgroundSlideshow.illusts"].landscape);
      done();
    })
  })

  it("get pixivimg from pixivSlideshowIllusts() and Math.random", (done) => {
    let returnValue = { a: 1 };
    sandbox.stub(pixivimg, "default");
    sandbox.stub(Math, "random");
    sandbox.stub(pixivSlideshowIllustsO, "pixivSlideshowIllusts");
    (Math.random as sinon.SinonStub).returns(1);
    (pixivSlideshowIllustsO.pixivSlideshowIllusts as sinon.SinonStub).returns(new Promise((resolve, reject) => {
      resolve(data["pixivBackgroundSlideshow.illusts"].landscape)
    }));
    (pixivimg.default as sinon.SinonStub).withArgs("1111").returns(new Promise((resolve, reject) => {
      resolve(returnValue)
    }))
    pixivSlideshowIllustImg().then((res) => {
      expect(res).to.be.deep.equal(returnValue)
      expect((Math.random as sinon.SinonStub)).to.be.calledOnce;
      expect((pixivimg.default as sinon.SinonStub)).to.be.calledOnce;
      expect((pixivSlideshowIllustsO.pixivSlideshowIllusts as sinon.SinonStub)).to.be.calledOnce;
      done();
    });
  })
})