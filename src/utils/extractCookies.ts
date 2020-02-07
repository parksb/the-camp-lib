import * as _ from 'lodash';
import { Cookie } from '../models';

/**
 * 헤더의 쿠키 문자열에서 세션 식별을 위한 kvp를 찾는다.
 * @param cookies - 헤더의 쿠키 값
 */
function extractCookies(cookies: string[]): Cookie {
  if (_.isEmpty(cookies)) {
    throw new Error('The cookie values in the header are empty.');
  }

  const [iuid] = cookies.filter((cookie) => {
    return cookie.includes('iuid=');
  });

  const [token] = cookies.filter((cookie) => {
    return cookie.includes('Token=');
  });

  return {
    iuid: iuid.slice(0, iuid.indexOf(';')),
    token: token.slice(0, token.indexOf(';')),
  };
}

export { extractCookies };
