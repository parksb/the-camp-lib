import dotenv from 'dotenv';

import * as services from '../../src/services';
import * as models from '../../src/models';

(async () => {
  dotenv.config();

  const id = process.env.USER_ID!;
  const password = process.env.USER_PWD!;

  const name = process.env.TRAINEE_NAME!;
  const className = process.env.CLASS_NAME! as models.SoldierClassName;
  const groupName = process.env.GROUP_NAME! as models.SoldierGroupName;
  const unitName = process.env.UNIT_NAME! as models.SoldierUnitName;
  const enterDate = process.env.ENTER_DATE!;
  const birth = process.env.TRAINEE_BIRTH!;

  const soldier = new models.Soldier(
    name,
    birth,
    enterDate,
    className,
    groupName,
    unitName,
    models.SoldierRelationship.FRIEND,
  );

  const cookies = await services.login(id, password);
  await services.addSoldier(cookies, soldier);
  const [trainee] = await services.fetchSoldiers(cookies, soldier);

  const message = new models.Message('Test title', 'Test content', trainee);

  await services.sendMessage(cookies, trainee, message);
})();
