import requestPromise from 'request-promise';

import { Cookie, Soldier } from '../models';
import { addLog, buildRequestUrl } from '../utils';

/**
 * 군인을 추가한다.
 * @param cookies - 세션 식별을 위한 쿠키
 * @param soldier - 추가할 군인 정보
 */
async function addSoldier(cookies: Cookie, soldier: Soldier) {
  const { missSoldierClassCdNm, grpCdNm, missSoldierClassCd, grpCd, name, birth, enterDate } = soldier;
  const options = {
    url: buildRequestUrl('missSoldier/insertDirectMissSoldierA.do'),
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: `iuid=${cookies.iuid};`,
    },
    form: {
      missSoldierClassCdNm,
      grpCdNm,
      missSoldierClassCd,
      grpCd,
      name,
      birth,
      enterDate,
    },
  };

  const response = await requestPromise(options, (err, res, body) => {
    if (err) {
      throw new Error(err);
    }

    addLog('addSoldier', `${res.statusCode} ${res.statusMessage}`);

    if (res.statusCode === 200 && body.resultCd !== '0000' && body.resultCd !== 'E001') {
      throw new Error(body.resultMsg || 'Unknown error.');
    }
  });

  if (!response) {
    throw new Error('Response is null.');
  }

  return true;
}

export { addSoldier };