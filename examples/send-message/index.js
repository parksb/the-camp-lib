const dotenv = require('dotenv');
const thecamp = require('the-camp-lib');

(async () => {
  dotenv.config();

  const id = process.env.USER_ID || '';
  const password = process.env.USER_PWD || '';

  const name = process.env.TRAINEE_NAME || '';
  const birth = process.env.TRAINEE_BIRTH || '';
  const enterDate = process.env.ENTER_DATE || '';
  const className = process.env.CLASS_NAME || '';
  const groupName = process.env.GROUP_NAME || '';
  const unitName = process.env.UNIT_NAME || '';

  const soldier = new thecamp.Soldier(
    name,
    birth,
    enterDate,
    className,
    groupName,
    unitName,
    thecamp.SoldierRelationship.FRIEND,
  );

  const cookies = await thecamp.login(id, password);
  await thecamp.addSoldier(cookies, soldier);
  const [trainee] = await thecamp.fetchSoldiers(cookies, soldier);

  const message = new thecamp.Message('Title', 'Content', trainee);

  await thecamp.sendMessage(cookies, trainee, message);
})();
