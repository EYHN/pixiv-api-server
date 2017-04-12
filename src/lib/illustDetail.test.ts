import { imageSizeE } from '../interface/imageUrlsI';
import * as getIllustPage from './getIllustPage';
import logger from './logger';
import nextTick from '../util/nextTick';
import * as pixivimg from './pixiv-img';
import illustDetailTestDetail from './illustDetailTestDetail';
import * as rewire from 'rewire';
import { expect, sandbox } from '../testhelper/test.helper';
import * as wait from '../util/wait';
describe('illustDetail', () => {
  let illustDetail: any;
  const testDate = illustDetailTestDetail;
  beforeEach(() => {
    illustDetail = rewire("./illustDetail.js");
  })

  afterEach(() => {
    sandbox.restore();
    illustDetail.__set__("DetailIllusts", []);
  });

  it("update when don't have any data and return undefined", async () => {
    illustDetail.__set__("DetailIllusts", []);
    sandbox.stub(illustDetail, "updateDetailIllust");
    let res = await illustDetail.detailillust();
    expect(res).to.be.undefined;
    expect(illustDetail.updateDetailIllust).to.be.calledOnce;
  })

  it("update when data has error and return undefined", async () => {
    illustDetail.__set__("DetailIllusts", [1]);
    sandbox.stub(illustDetail, "updateDetailIllust");
    let res = await illustDetail.detailillust();
    expect(res).to.be.undefined;
    expect(illustDetail.updateDetailIllust).to.be.calledOnce;
  })

  it("It is not updated when data is already available and return one of them", async () => {
    illustDetail.__set__("DetailIllusts", testDate);
    sandbox.stub(illustDetail, "updateDetailIllust");
    sandbox.stub(pixivimg, "default");
    sandbox.stub(getIllustPage, "getSingleImageFromIllust").returns("1");
    let res = await illustDetail.detailillust({
      size:imageSizeE.medium
    });
    expect(pixivimg.default).to.be.calledOnce;
    expect(getIllustPage.getSingleImageFromIllust).to.be.calledOnce
    expect((getIllustPage.getSingleImageFromIllust as sinon.SinonStub).args[0][1]).to.be.equal(imageSizeE.medium);
    expect((pixivimg.default as sinon.SinonStub).args[0][0]).to.be.equal("1")
    expect((illustDetail.updateDetailIllust as sinon.SinonStub).called).to.be.false;
  })

  class testpixiv{
    pointer:number = 0;
    oncelength = 5;
    data = testDate;
    times = this.data.length / this.oncelength
    next(){
      let pointer = this.pointer;
      let returns = nextTick.then(()=>({
        illusts:[...this.data.slice(pointer,pointer + this.oncelength)]
      }))
      this.pointer += this.oncelength;
      return returns;
    }
    hasNext(){
      return typeof this.data[this.pointer] !== "undefined"
    }
    illustRanking(){
      return this.next();
    }
  }

  it("Update detail illust", async () => {
    let pixiv = new testpixiv
    illustDetail.__set__("pixiv",pixiv);
    illustDetail.__set__("updating",false)
    sandbox.stub(wait, "default");
    let res = illustDetail.updateDetailIllust();
    expect(illustDetail.__get__("updating"),"put the flag true").to.be.true;
    await res;
    expect(wait.default).to.be.callCount(Math.ceil(pixiv.times)).and.to.be.calledWith(100);
    expect(illustDetail.__get__("DetailIllusts")).to.be.deep.equal(testDate);
    expect(illustDetail.__get__("updating"),"put the flag false").to.be.false;
  })

  it("on update detail illust err", async () => {
    let pixiv = new testpixiv
    illustDetail.__set__("pixiv",pixiv);
    illustDetail.__set__("updating",false);
    sandbox.stub(wait, "default");
    sandbox.stub(pixiv, "hasNext").throws("err");
    sandbox.stub(logger, "error");
    let res = illustDetail.updateDetailIllust();
    expect(illustDetail.__get__("updating"),"put the flag true").to.be.true;
    await res;
    expect(logger.error).to.be.calledOnce;
    expect(illustDetail.__get__("DetailIllusts").length).to.be.equal(0);
  })
})