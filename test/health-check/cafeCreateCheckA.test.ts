import { expect } from 'chai';
import requestPromise from 'request-promise';

import { buildRequestUrl } from '../../src/utils';

const url = 'main/cafeCreateCheckA.do';
const options = {
  url: buildRequestUrl(url),
  method: 'POST',
  json: true,
  followAllRedirects: true,
};

describe('Health check', () => {
  context(`${url}에 요청을 보내는 경우`, () => {
    it('HTTP 싱태 코드 200 응답이 온다', async () => {
      let code: number = 0;
      await requestPromise(options, (err, res) => {
        code = res.statusCode;
      });
      expect(code).to.be.equal(200);
    });
  });
});
