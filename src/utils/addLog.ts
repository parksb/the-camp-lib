/**
 * 로그를 출력한다.
 * @param {string} service 서비스 이름
 * @param {string} text 내용
 */
function addLog(service: string, text: string) {
  console.log(`${text} : ${service} - ${new Date()}`);
}

export { addLog };
