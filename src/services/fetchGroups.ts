import requestPromise from 'request-promise';
import * as _ from 'lodash';

import { Cookie, Group } from '../models';
import { buildRequestUrl, addLog } from '../utils';

interface Response {
  result_code: number;
  my_group: Group[];
  recommend_group?: string;
}

/**
 * 가입 카페 정보를 가져온다.
 * @param cookies - 세션 식별을 위한 쿠키
 * @param unitNumber - 연대/사단 이름
 * @param enterDate - 입소 날짜 (YYYYMMDD)
 */
async function fetchGroups(cookies: Cookie, unitName?: string, enterDate?: string) {
  let result: Group | Group[] | null = null;
  const options = {
    uri: buildRequestUrl('troop/group/getMyGroupList.do'),
    method: 'POST',
    json: true,
    body: {},
    headers: {
      Cookie: `${cookies.jsessionid} ${cookies.scouter}`,
    },
  };

  await requestPromise(options, (err, res, body) => {
    if (err) {
      throw new Error(err);
    }

    addLog('fetchGroups', `${res.statusCode} ${res.statusMessage}`);

    if (res.statusCode === 200 && body.resultCode !== 200) {
      throw new Error(body.resultMessage || 'Unknown error.');
    }

    if (!_.isEmpty(body.resultData)) {
      const groups: Group[] = [];
      const data: Response = body.resultData;

      for (const list in data) {
        const parsedData = JSON.parse(data[list]).my_group[0];
        const group: Group = {
          unitName: parsedData.unit_name,
          fullName: parsedData.full_name,
          enterDate: parsedData.enter_date,
          groupId: parsedData.group_id,
          groupName: parsedData.group_name,
          groupImage: parsedData.group_image,
          accessDate: parsedData.access_date,
          grade: parsedData.grade,
          unitCode: parsedData.unit_code,
          unitType: parsedData.unit_type,
        };
        groups.push(group);
      }

      if (unitName && enterDate) {
        result = groups.find((group: Group) => {
          return group.unitName === unitName.trim() && group.enterDate === enterDate;
        }) || null;
      } else {
        result = groups;
      }
    } else {
      throw new Error('Group data not found.');
    }
  });

  if (!result) {
    throw new Error('Result is null.');
  }

  return _.flattenDeep([result]);
}

export { fetchGroups };
