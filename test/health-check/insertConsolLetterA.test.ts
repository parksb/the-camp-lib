import { expect } from 'chai';

import { buildRequestUrl, request, HttpRequestOptions } from '../../src/utils';

const url = 'consolLetter/insertConsolLetterA.do';
const options: HttpRequestOptions = {
  url: buildRequestUrl(url),
  method: 'POST',
  json: true,
};

describe('Health check', () => {
  context(`${url}에 요청을 보내는 경우`, () => {
    it('HTTP 싱태 코드 200 응답이 온다', async () => {
      const response = await request(options);
      const code = response.statusCode;
      expect(code).to.be.equal(200);
    });
  });
});
