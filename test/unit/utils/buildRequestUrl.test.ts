import { expect } from 'chai';

import { buildRequestUrl } from '../../../src/utils';

describe('buildRequestUrl', () => {
  context('리소스 URL을 전달하는 경우', () => {
    it('베이스 URL에 덧붙여 반환한다', () => {
      const resource = 'login/loginA.do';
      const result = buildRequestUrl(resource);
      expect(result).to.be.equal(`https://www.thecamp.or.kr/${resource}`);
    });
  });
});
