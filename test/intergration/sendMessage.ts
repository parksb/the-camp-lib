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

  const soldier = new models.Soldier(
    name,
    birth,
    enterDate,
    models.SoldierClassName[className],
    models.SoldierGroupName[groupName],
    models.SoldierUnitName[unitName],
    models.SoldierRelationship.FRIEND,
  );

  const cookies = await services.login(id, password);
  await services.addSoldier(cookies, soldier);
  const [trainee] = await services.fetchSoldiers(cookies, soldier);

  const message = new models.Message('Test title', 'Test content', trainee.getTraineeMgrSeq()!);

  await services.sendMessage(cookies, trainee, message);
})();
