/**
 * 더 캠프로 요청을 보내기 위한 url을 만든다.
 * @param resources - 요청할 리소스
 */
function buildRequestUrl(resources: string) {
  const baseUrl = 'https://www.thecamp.or.kr';
  return `${baseUrl}/${resources}`;
}

export { buildRequestUrl };
