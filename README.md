# THE CAMP Unofficial Library

[![npm downloads](https://img.shields.io/npm/dt/the-camp-lib?style=flat-square)](https://www.npmjs.com/package/the-camp-lib) [![npm version](https://img.shields.io/npm/v/the-camp-lib?style=flat-square)](https://www.npmjs.com/package/the-camp-lib) [![health check](https://img.shields.io/github/workflow/status/ParkSB/the-camp-lib/HealthCheck/master?label=health%20check&style=flat-square)](https://github.com/ParkSB/the-camp-lib/actions?query=workflow%3A"HealthCheck") [![npm license](https://img.shields.io/npm/l/the-camp-lib?style=flat-square)](LICENSE)

대국민 국군 소통 서비스 [더 캠프](http://www.thecamp.or.kr/)를 사이트 외부에서 이용하기 위해 만든 비공식 라이브러리입니다. 현재 인터넷 편지 발송을 중심으로 구현되어 있습니다. 매주 월요일 0시 [API의 유효성을 체크](https://github.com/ParkSB/the-camp-lib/actions?query=workflow%3A%22HealthCheck%22)합니다. `passing` 상태가 아니라면 API가 동작하지 않는다는 의미이니 참고해주세요.

# Installation

```bash
$ npm install the-camp-lib --save
```

# Usage

```js
const thecamp = require('the-camp-lib');
// or
import * as thecamp from 'the-camp-lib';

async function main() {
  const soldier = new thecamp.Soldier(
    '박뫄뫄',
    '20011129',
    '20200829',
    '예비군인/훈련병',
    '육군',
    '육군훈련소(00연대)',
    thecamp.SoldierRelationship.FRIEND,
  );

  const client = new thecamp.Client();
  
  await client.login('user@email.com', 'password');
  await client.addSoldier(soldier);
 
  const [trainee] = await client.fetchSoldiers(soldier);
  const message = new thecamp.Message('Test title', 'Test content', trainee);
 
  await client.sendMessage(soldier, message);
}
```

# Development

저장소를 클론하고 패키지를 설치합니다.

```bash
$ git clone https://github.com/ParkSB/the-camp-lib.git
$ cd the-camp-lib
$ npm install
```

모든 코드는 `src` 디렉토리 아래에 있습니다. `npm test` 명령으로 API 유효성을 체크하고 유닛 테스트를 실행할 수 있습니다. `npm run test:unit` 명령과 `npm run test:health-check` 명령으로 유닛 테스트와 API 체크를 따로 실행할 수도 있습니다. 또한 `test/feature` 디렉토리 하위에 테스트할 코드를 작성한 뒤 `ts-node filename.ts`를 실행하는 방식으로 실제 동작을 테스트할 수 있습니다.

쉘에서 `npm run build`를 실행하면 `dist` 디렉토리에 빌드된 파일이 만들어집니다. `test` 디렉토리 하위에 예시 디렉토리를 만든 뒤 `npm init`, `npm install ../../ --save`를 실행하면 해당 디렉토리에 패키지가 설치됩니다. 이렇게 하면 로컬에서 배포 버전을 테스트할 수 있습니다.

# Specifications

> 라이브러리를 사용하기 전에 더 캠프에 가입된 계정이 필요합니다.

## Models

### `interface Cookie`

세션 식별을 위한 쿠키.

* `iuid: string`

### `class Soldier`

군인 정보.

* `missSoldierClassCdNm: SoldierClassName` - 성분
* `missSoldierClassCd: SoldierClass` - 성분 코드
* `grpCdNm: SoldierGroupName` - 군종
* `grpCd: SoldierGroup` - 군종 코드
* `name: string` - 이름 
* `birth: string` - 생년월일 
* `enterDate: string` - 입열 날짜 
* `trainUnitCd: SoldierUnit` - 입영부대 코드
* `trainUnitNm: SoldierUnitNm` - 입영부대 
* `missSoldierRelationshipCd: SoldierRelationship` - 관계 코드
* `traineeMgrSeq?: string` - 훈련병 식별 코드

#### Constructor

* `name: string` - 이름 (e.g., `'박뫄뫄'`)
* `birth: string` - 생년월일 (e.g., `'20011129'`)
* `enterDate: string` - 입영날짜 (e.g., `'20200829'`)
* `className: SoldierClassName` - 성분 (e.g., `'예비군인/훈련병'`)
* `groupName: SoldierGroupName` - 군종 (e.g., `'육군'`)
* `unitName: SoldierUnitName` - 입영부대 (e.g., `'28사단'`, `'육군훈련소(25연대)'`)
* `relationship: SoldierRelationship` - 관계 (e.g., `SoldierRelationship.FRIEND`)

### `enum SoldierClass`

성분 코드.

* `'예비군인/훈련병' = '0000490001'`
* `'병사' = '0000490002'`
* `'장교' = '0000490003'`
* `'부사관' = '0000490004'`
* `'군무원' = '0000490005'`

> 인터넷 편지는 `예비군인/훈련병`에게만 발송할 수 있습니다.

### `enum SoldierGroup`

군종 코드.

* `'육군' = '0000010001'`
* `'해군' = '0000010002'`
* `'공군' = '0000010003'`
* `'해병대' = '0000010004'`

> 인터넷 편지는 `육군`에게만 발송할 수 있습니다.

### `enum SoldierRelationship`

관계 코드.

* `PARENT = '0000420001'` - 부모
* `SPOUSE = '0000420003'` - 배우자
* `SIBLING = '0000420002'` - 형제/자매
* `FRIEND = '0000420006'` - 친구/지인
* `LOVER = '0000420005'` - 애인
* `RELATIVE = '0000420004'` - 친척
* `FAN = '0000420007'` - 팬

### `class Message`

인터넷 편지 정보.

* `sympathyLetterSubject: string` - 편지 제목
* `sympathyLetterContent: string` - 편지 내용 (1500자 이하)
* `traineeMgrSeq: string` - 훈련병 식별 코드

#### Constructor

* `sympathyLetterSubject: string` - 편지 제목 (e.g., `'Title'`)
* `sympathyLetterContent: string` - 편지 내용 (e.g., `'Content'`, `'<i>Content</i>'`)
* `traineeMgrSeq: string` - 훈련병 식별 코드 (e.g., `soldier.getTraineeMgrSeq()!`)

## Services

### `login(id: string, password: string)`

더 캠프에 로그인해 세션 쿠키를 얻는다.

* **Parameters**
  * `id: string` - 더 캠프 계정 이메일
  * `password: string` - 더 캠프 계정 비밀번호
* **Return value**
  * `Promise<Cookie>` - 세션 식별을 위한 쿠키

### `addSoldier(cookies: Cookie, soldier: Soldier)`

계정에 군인을 추가한다.

* **Parameters**
  * `cookies: Cookie` - 세션 식별을 위한 쿠키
  * `soldier: Soldier` - 군인 정보
* **Return value**
  * `Promise<boolean>` - 추가에 성공하거나, 이미 해당 군인이 존재하면 `true`를 반환한다.

### `fetchSoldier(cookies: Cookie, soldier: Soldier)`

군인 정보를 가져온다.

* **Parameters**
  * `cookies: Cookie` - 세션 식별을 위한 쿠키
  * `soldier: Soldier` - 군인 정보
* **Return value**
  * `Promise<Soldier[]>` - 계정에 추가한 군인 목록 중 매개변수로 전달한 군인과 이름, 생일, 입영 날짜, 입영 부대 코드가 일치하는 `Soldier` 리스트를 반환한다.

### `sendMessage(cookies: Cookie, trainee: Soldier, message: Message)`

인터넷 편지를 전송한다. 

* **Parameters**
  * `cookies: Cookie` - 세션 식별을 위한 쿠키
  * `trainee: Trainee` - 훈련병 정보
  * `message: Message` - 인터넷 편지 정보
* **Return value**
  * `Promise<boolean>` - 전송에 성공하면 `true`를 반환한다.

# Examples

* 인터넷 편지 전송 예시: [send-message](examples/send-message)
* 뉴스 발송 프로젝트: [daily-news-for-trainee](https://github.com/ParkSB/daily-news-for-trainee)

# Other implementations

* Python: [lewisleedev/thecampy](https://github.com/lewisleedev/thecampy)

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
