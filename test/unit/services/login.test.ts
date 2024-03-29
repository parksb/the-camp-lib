import { expect } from 'chai';

import { buildRequestUrl, request, HttpRequestOptions } from '../../../src/utils';

const options = (userId?: string, userPwd?: string): HttpRequestOptions => {
  return {
    url: buildRequestUrl('login/loginA.do'),
    method: 'POST',
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
    it('resultCd 9000 응답이 온다', async () => {
      const { body } = await request(options('user@email.com', 'password'));
      expect(body.resultCd).to.be.equal('9000');
    });
  });

  context('이메일을 입력하지 않는 경우', () => {
    it('resultCd 9006 응답이 온다', async () => {
      const { body } = await request(options(undefined, 'password'));
      expect(body.resultCd).to.be.equal('9006');
    });
  });

  context('비밀번호를 입력하지 않는 경우', () => {
    it('resultCd 9000 응답이 온다', async () => {
      const { body } = await request(options('user@email.com'));
      expect(body.resultCd).to.be.equal('9000');
    });
  });
});
