import { expect } from 'chai';
import requestPromise from 'request-promise';

import { buildRequestUrl } from '../../../src/utils';

const options = (resources: string) => {
  return {
    url: buildRequestUrl(resources),
    method: 'POST',
    json: true,
    followAllRedirects: true,
  };
};

describe('Health check', () => {
  context('addSoldier', () => {
    it('HTTP Status Code: 200', async () => {
      let code: number;
      await requestPromise(options('missSoldier/insertDirectMissSoldierA.do'), (err, res) => {
        code = res.statusCode;
      });
      expect(code).to.be.equal(200);
    });
  });

  context('fetchSoldier', () => {
    it('HTTP Status Code: 200', async () => {
      let code: number;
      await requestPromise(options('main/cafeCreateCheckA.do'), (err, res) => {
        code = res.statusCode;
      });
      expect(code).to.be.equal(200);
    });
  });

  context('login', () => {
    it('HTTP Status Code: 200', async () => {
      let code: number;
      await requestPromise(options('login/loginA.do'), (err, res) => {
        code = res.statusCode;
      });
      expect(code).to.be.equal(200);
    });
  });

  context('sendMessage', () => {
    it('HTTP Status Code: 200', async () => {
      let code: number;
      await requestPromise(options('main/cafeCreateCheckA.do'), (err, res) => {
        code = res.statusCode;
      });
      expect(code).to.be.equal(200);
    });
  });
});
