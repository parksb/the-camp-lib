import { expect } from 'chai';

import { buildRequestUrl, request, RequestOptions } from '../../../src/utils';

const options = (userId?: string, userPwd?: string): RequestOptions => {
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
      const response = await request(options('user@email.com', 'password'));
      const data = await response.data;
      expect(data.resultCd).to.be.equal('9000');
    });
  });

  context('이메일을 입력하지 않는 경우', () => {
    it('resultCd 9006 응답이 온다', async () => {
      const response = await request(options(undefined, 'password'));
      const data = await response.data;
      expect(data.resultCd).to.be.equal('9006');
    });
  });

  context('비밀번호를 입력하지 않는 경우', () => {
    it('resultCd 9000 응답이 온다', async () => {
      const response = await request(options('user@email.com'));
      const data = await response.data;
      expect(data.resultCd).to.be.equal('9000');
    });
  });
});
