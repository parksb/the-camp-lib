const dotenv = require('dotenv').config();
const thecamp = require('the-camp-lib');

(async () => {
  const id = process.env.USER_ID;
  const password = process.env.USER_PWD;

  const traineeName = process.env.TRAINEE_NAME;
  const unitName = process.env.UNIT_NAME;
  const enterDate = process.env.ENTER_DATE;
  const birth = Number(process.env.TRAINEE_BIRTH);

  const cookies = await thecamp.login(id, password);
  const [group] = await thecamp.fetchGroups(cookies, unitName, enterDate);

  const trainee = {
    birth,
    unitCode: group.unitCode,
    groupId: group.groupId,
    traineeName: traineeName,
    relationship: thecamp.Relationship.FRIEND,
  };

  const message = {
    title: 'Test title',
    content: 'Test content',
  };

  await thecamp.sendMessage(cookies, trainee, message);
})();
