// modify from https://www.sitepoint.com/cache-fetched-ajax-requests/

import logger from './logger'
import 'isomorphic-fetch';
import 'babel-polyfill';

const utils = require('utility');

export const Storage = new Map<string, any>();

function getContent(content: any) {
  try {
    content = JSON.parse(content);
  } catch (e) { }
  return content;
}

interface cachedFetchInit extends RequestInit {
  timeout?: number
}

export function reset(){
  Storage.clear();
}

export default function cachedFetch(url: string | Request, options: cachedFetchInit = {}) {
  let expiry = 10 * 60 // 5 min default
  let cacheKey: string = undefined;

  // Use the URL as the cache key to localStorage

  cacheKey = 'cf_' + utils.md5(url);
  const cached = Storage.get(cacheKey);

  const cachedExpiresAt = Storage.get(cacheKey + ':ts');
  if (cached !== undefined && cachedExpiresAt !== undefined) {
    let age = (Date.now() - cachedExpiresAt) / 1000
    if (age < expiry) {
      logger.info("Cache Hit : " + cacheKey)
      let buffer = Buffer.from([]);
      let response = new Response(cached);
      return Promise.resolve(response)
    } else {
      Storage.delete(cacheKey)
      Storage.delete(cacheKey + ':ts')
    }
  }

  return fetch(url, options).then((response) => {
    if (response.status === 200) {
      const ct = response.headers.get('Content-Type');
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        response.clone().text().then((content) => {
          Storage.set(cacheKey, content)
            .set(cacheKey + ':ts', Date.now())
        });
      }
    }
    return response;
  });
}