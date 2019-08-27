import * as request from 'request';
import requestPromise from 'request-promise';

import { Trainee, Message, Cookie } from '../models';
import { buildRequestUrl, addLog } from '../utils';

/**
 * 인터넷 편지를 전송한다.
 * @param cookies - 세션 식별을 위한 쿠키
 * @param trainee - 훈련병 정보
 * @param message - 인터넷 편지 정보
 */
async function sendMessage(cookies: Cookie, trainee: Trainee, message: Message) {
  let response: request.Response | null = null;
  const options = {
    uri: buildRequestUrl('message/letter/insert.do'),
    method: 'POST',
    json: true,
    body: {
      unit_code: trainee.unitCode,
      group_id: trainee.groupId,
      relationship: trainee.relationship,
      trainee_name: trainee.traineeName,
      title: message.title,
      content: message.content,
      boardId: message.boardId || '',
      fileInfo: message.fileInfo || [],
    },
    headers: {
      Cookie: `${cookies.jsessionid} ${cookies.scouter}`,
    },
  };

  await requestPromise(options, (err, res, body) => {
    if (err) {
      throw new Error(err);
    }

    addLog('sendMessage', `${res.statusCode} ${res.statusMessage}`);

    if (res.statusCode === 200 && body.resultCode !== 200) {
      throw new Error(body.resultMessage || 'Unknown error.');
    }

    response = res;
  });

  if (!response) {
    throw new Error('Response is null.');
  }

  return response as request.Response;
}

export { sendMessage };
