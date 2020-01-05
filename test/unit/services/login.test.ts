import { expect } from 'chai';
import requestPromise from 'request-promise';

import { buildRequestUrl } from '../../../src/utils';

const options = (userId?: string, userPwd?: string) => {
  return {
    url: buildRequestUrl('login/loginA.do'),
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      userId,
      userPwd,
      state: 'email-login',
      autoLoginYn: 'N',
    },
  };
};

describe('login', () => {
  context('존재하지 않는 계정으로 로그인하는 경우', () => {
    it('resultCd: 9000', async () => {
      const response = await requestPromise(options('user@email.com', 'password'));
      expect(response.resultCd).to.be.equal('9000');
    });
  });

  context('이메일을 입력하지 않는 경우', () => {
    it('resultCd: 9000', async () => {
      const response = await requestPromise(options(undefined, 'password'));
      expect(response.resultCd).to.be.equal('9006');
    });
  });

  context('비밀번호를 입력하지 않는 경우', () => {
    it('resultCd: 9000', async () => {
      const response = await requestPromise(options('user@email.com'));
      expect(response.resultCd).to.be.equal('9000');
    });
  });
});
