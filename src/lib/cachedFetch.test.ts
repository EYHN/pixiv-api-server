import { expect } from '../testhelper/test.helper';
import * as cachedFetch from './cachedFetch';
import * as fetchMock from 'fetch-mock';

describe('cachedFetch', () => {
  const data = { a: 1 };
  const url = "https://huaji8.top"

  afterEach(() => {
    cachedFetch.Storage.clear();
    fetchMock.restore();
  });

  it("fetch twice called once", async () => {
    const response = new Response(JSON.stringify(data),{
      headers:{
        "Content-Type": "application/json"
      }
    });
    fetchMock.getOnce(url, response)
    let res = await cachedFetch.default(url);
    let json = await res.json();
    expect(json).to.be.deep.equal(data);
    res = await cachedFetch.default(url);
    json = await res.json();
    expect(json).to.be.deep.equal(data);
  })

  it("only cache when the status is 200 ", async () => {
    const response = new Response(JSON.stringify(data),{
      headers:{
        "Content-Type": "application/json"
      },
      status: 404
    });
    fetchMock.getOnce(url, response)
    let res = await cachedFetch.default(url);
    let json = await res.json();
    expect(json).to.be.deep.equal(data);
    expect(cachedFetch.Storage.size).to.be.eql(0);
  })

  it("only cache when the Content-Type is application/json or text ", async () => {
    const response = new Response(JSON.stringify(data),{
      headers:{
        "Content-Type": "image/jpeg"
      },
      status: 200
    });
    fetchMock.getOnce(url, response)
    let res = await cachedFetch.default(url);
    let json = await res.json();
    expect(json).to.be.deep.equal(data);
    expect(cachedFetch.Storage.size).to.be.eql(0);
  })

  it("reset cache will clean ", async () => {
    cachedFetch.Storage.set("123","321");
    cachedFetch.reset();
    expect(cachedFetch.Storage.size).to.be.eql(0);
  })
})