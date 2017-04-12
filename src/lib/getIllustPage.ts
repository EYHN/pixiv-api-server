import { illustI } from '../interface/illustI';
import { imageSizeE, imageUrlsI } from '../interface/imageUrlsI';
const defaultSize = imageSizeE.large

export const getImageFromUrls = (imageUrls: imageUrlsI, size: imageSizeE = defaultSize) => {
  let keys = Object.keys(imageUrls)
  let s = keys.map((value) => {
    return Math.abs(String2imageSizeE(value) - size)
  })
  let lowest = s.reduce((lowest, next, index) => {
    return next < s[lowest] ? index : lowest
  },0);
  let key = keys[lowest]
  return imageUrls[key];
}

export const getSingleImageFromIllust = (illust: illustI, size: imageSizeE = defaultSize) => {
  if(illust.pageCount == 1){
    return getImageFromUrls({
      ...illust.imageUrls,
      "original":illust.metaSinglePage.originalImageUrl
    },size)
  }else{
    return getImageFromUrls(illust.metaPages[0].imageUrls,size)
  }
}

export const imageSizeE2String = (size: imageSizeE) => {
  switch (size) {
    case imageSizeE.large:
      return "large";
    case imageSizeE.medium:
      return "medium";
    case imageSizeE.original:
      return "original";
    case imageSizeE.squareMedium:
      return "squareMedium";
  }
}

export const String2imageSizeE = (size: string) => {
  switch (size) {
    case "large":
      return imageSizeE.large;
    case "medium":
      return imageSizeE.medium;
    case "original":
      return imageSizeE.original;
    case "squareMedium":
      return imageSizeE.squareMedium;
    default:
      return defaultSize;
  }
}