import dotenv from 'dotenv';

import * as services from '../../src/services';
import * as models from '../../src/models';

(async () => {
  dotenv.config();

  const id = process.env.USER_ID!;
  const password = process.env.USER_PWD!;

  const traineeName = process.env.TRAINEE_NAME!;
  const unitName = process.env.UNIT_NAME!;
  const enterDate = process.env.ENTER_DATE!;
  const birth = Number(process.env.TRAINEE_BIRTH!);

  const cookies = await services.login(id, password);
  const [group] = await services.fetchGroups(cookies, unitName, enterDate);

  const trainee = {
    birth,
    traineeName,
    unitCode: group.unitCode,
    groupId: group.groupId,
    relationship: models.Relationship.FRIEND,
  };

  const message = {
    title: 'Test title',
    content: 'Test content',
  };

  await services.sendMessage(cookies, trainee, message);
})();
