import * as _ from 'lodash';
import { Cookie } from '../models';

/**
 * 헤더의 쿠키 문자열에서 세션 식별을 위한 kvp를 찾는다.
 * @param headerCookie - 헤더의 쿠키 값
 */
function resolveSessionCookies(headerCookie: string[]): Cookie {
  if (_.isEmpty(headerCookie)) {
    throw new Error('The cookie values in the header are empty.');
  }

  const iuid = headerCookie.find((cookie) => {
    return cookie.includes('iuid=');
  })!.match(/iuid=\d{6};/)![0]
    .replace(/iuid=/, '')
    .replace(/;/, '');

  return { iuid };
}

export { resolveSessionCookies };
