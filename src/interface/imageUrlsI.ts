export interface imageUrlsI {
  "squareMedium"?:string
  "medium"?:string,
  "large"?:string,
  "original"?:string,
  [key: string]: string
}

export enum imageSizeE {
  squareMedium,
  medium,
  large,
  original
}