import requestPromise from 'request-promise';

import { Cookie, Soldier } from '../models';
import { addLog, buildRequestUrl } from '../utils';

/**
 * 군인 정보를 가져온다.
 * @param cookies - 세션 식별을 위한 쿠키
 * @param soldier - 확인할 군인 정보
 */
async function fetchSoldiers(cookies: Cookie, soldier: Soldier) {
  const { name, birth, enterDate, trainUnitCd } = soldier;
  const options = {
    url: buildRequestUrl('main/cafeCreateCheckA.do'),
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: `iuid=${cookies.iuid};`,
    },
    form: {
      name,
      birth,
      enterDate,
      trainUnitCd,
    },
  };

  const response = await requestPromise(options, (err, res, body) => {
    if (err) {
      throw new Error(err);
    }

    addLog('fetchSoldier', `${res.statusCode} ${res.statusMessage}`);

    if (res.statusCode === 200 && body.resultCd !== '9999') {
      throw new Error(body.resultMsg || '알 수 없는 에러.');
    }
  });

  if (!response) {
    throw new Error('응답 값이 없습니다.');
  }

  const result: Soldier[] = response.listResult.map((fetchedSoldier) => {
    const { traineeMgrSeq, trainUnitEduSeq } = fetchedSoldier;
    return {
      ...soldier,
      traineeMgrSeq,
      trainUnitEduSeq,
    };
  });

  if (!result || result.length === 0) {
    throw new Error('해당하는 군인을 찾을 수 없습니다.');
  }

  return result;
}

export { fetchSoldiers };
