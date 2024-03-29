import { Cookie, Soldier } from '../models';
import { addLog, buildRequestUrl, request, HttpRequestOptions } from '../utils';

/**
 * 군인 정보를 가져온다.
 * @param cookies - 세션 식별을 위한 쿠키
 * @param soldier - 확인할 군인 정보
 */
async function fetchSoldiers(cookies: Cookie, soldier: Soldier) {
  const options: HttpRequestOptions = {
    url: buildRequestUrl('main/cafeCreateCheckA.do'),
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: `${cookies.iuid}; ${cookies.token}`,
    },
    form: {
      name: soldier.getName(),
      birth: soldier.getBirth(),
      enterDate: soldier.getEnterDate(),
      trainUnitCd: soldier.getTrainUnitCd(),
      grpCd: soldier.getGrpCd(),
    },
  };

  const response = await request(options);
  addLog('fetchSoldier', `${response.statusCode} ${response.statusMessage}`);

  const { body } = response;

  if (!body) {
    throw new Error('응답 값이 없습니다.');
  }

  if (response.statusCode === 200 && body.resultCd !== '9999') {
    throw new Error(body.resultMsg || '알 수 없는 에러.');
  }

  const result: Soldier[] = body.listResult.map((fetchedSoldierInfo) => {
    const { traineeMgrSeq } = fetchedSoldierInfo;
    const clonedSoldier = soldier.clone();
    clonedSoldier.setTraineeMgrSeq(traineeMgrSeq);
    return clonedSoldier;
  });

  if (!result || result.length === 0) {
    throw new Error('해당하는 군인을 찾을 수 없습니다.');
  }

  return result;
}

export { fetchSoldiers };
