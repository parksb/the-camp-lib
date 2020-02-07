import requestPromise from 'request-promise';

import { Cookie, Soldier } from '../models';
import { addLog, buildRequestUrl } from '../utils';

/**
 * 군인을 추가한다.
 * @param cookies - 세션 식별을 위한 쿠키
 * @param soldier - 추가할 군인 정보
 */
async function addSoldier(cookies: Cookie, soldier: Soldier) {
  const options = {
    url: buildRequestUrl('missSoldier/insertDirectMissSoldierA.do'),
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: `${cookies.iuid}; ${cookies.token}`,
    },
    form: {
      missSoldierClassCdNm: soldier.getMissSoldierClassCdNm(),
      grpCdNm: soldier.getGrpCdNm(),
      missSoldierClassCd: soldier.getMissSoldierClassCd(),
      grpCd: soldier.getGrpCd(),
      name: soldier.getName(),
      birth: soldier.getBirth(),
      enterDate: soldier.getEnterDate(),
    },
  };

  const response = await requestPromise(options, (err, res, body) => {
    if (err) {
      throw new Error(err);
    }

    addLog('addSoldier', `${res.statusCode} ${res.statusMessage}`);

    if (res.statusCode === 200 && body.resultCd !== '0000' && body.resultCd !== 'E001') {
      throw new Error(body.resultMsg || '알 수 없는 에러.');
    }
  });

  if (!response) {
    throw new Error('응답 값이 없습니다.');
  }

  return true;
}

export { addSoldier };
