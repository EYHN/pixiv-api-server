import { expect } from '../testhelper/test.helper';
import { imageSizeE } from '../interface/imageUrlsI';
import { getImageFromUrls } from './getIllustPage';
import * as rewire from 'rewire';
describe('getIllustPage', () => {

  context("getImageFromUrls",()=>{
    it("find the url with size",()=>{
      expect(getImageFromUrls({
        "large":"1",
        "medium":"2",
        "original":"3",
        "squareMedium":"4"
      },imageSizeE.medium)).to.be.equal("2");
    })

    it("find the url with default size",()=>{
      let getIllustPage = rewire("./getIllustPage.js") as any;
      getIllustPage.__set__("defaultSize",imageSizeE.medium)
      expect(getIllustPage.getImageFromUrls({
        "large":"1",
        "medium":"2",
        "original":"3",
        "squareMedium":"4"
      })).to.be.equal("2");
    })
  })
})