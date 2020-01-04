import dotenv from 'dotenv';

import * as services from '../../src/services';
import * as models from '../../src/models';

(async () => {
  dotenv.config();

  const id = process.env.USER_ID!;
  const password = process.env.USER_PWD!;

  const name = process.env.TRAINEE_NAME!;
  const className = process.env.CLASS_NAME!;
  const groupName = process.env.GROUP_NAME!;
  const unitName = process.env.UNIT_NAME!;
  const enterDate = process.env.ENTER_DATE!;
  const birth = process.env.TRAINEE_BIRTH!;

  const soldier: models.Soldier = {
    name,
    birth,
    enterDate,
    missSoldierClassCdNm: models.SoldierClassName[className],
    missSoldierClassCd: models.SoldierClass[className],
    grpCdNm: models.SoldierGroupName[groupName],
    grpCd: models.SoldierGroup[groupName],
    trainUnitCd: models.SoldierUnit[unitName],
    missSoldierRelationshipCd: models.SoldierRelationship.FRIEND,
  };

  const cookies = await services.login(id, password);
  await services.addSoldier(cookies, soldier);
  const [trainee] = await services.fetchSoldiers(cookies, soldier);

  const message = {
    title: 'Test title',
    content: 'Test content',
  };

  await services.sendMessage(cookies, trainee, message);
})();
