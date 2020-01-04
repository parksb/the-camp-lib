/**
 * 성분 코드
 */
enum SoldierClass {
  '예비군인/훈련병' = '0000490001',
  '병사' = '0000490002',
  '장교' = '0000490003',
  '부사관' = '0000490004',
  '군무원' = '0000490005',
}

type SoldierClassName = '예비군인/훈련병' | '병사' | '장교' | '부사관' | '군무원';

/**
 * 군종 코드
 */
enum SoldierGroup {
  '육군' = '0000010001',
  '해군' = '0000010002',
  '공군' = '0000010003',
  '해병대' = '0000010004',
}

type SoldierGroupName = '육군' | '해군' | '공군' | '해병대';

/**
 * 입영부대 코드
 */
enum SoldierUnit {
  '1사단' = '20121290100',
  '2사단' = '20121490100',
  '3사단' = '20121590100',
  '5사단' = '20121690200',
  '6사단' = '20121590200',
  '7사단' = '20121390100',
  '9사단' = '20121290200',
  '11사단' = '20121790300',
  '12사단' = '20121490200',
  '15사단' = '20121390200',
  '17사단' = '20121190100',
  '20사단' = '20121790400',
  '21사단' = '20121490300',
  '22사단' = '20121890100',
  '23사단' = '20121890200',
  '25사단' = '20121290300',
  '27사단' = '20121390300',
  '28사단' = '20121690100',
  '30사단' = '20121290400',
  '31사단' = '20220280100',
  '32사단' = '20220280200',
  '35사단' = '20220280300',
  '36사단' = '20120180100',
  '37사단' = '20220280400',
  '39사단' = '20220280500',
  '50사단' = '20220280600',
  '51사단' = '20121190200',
  '53사단' = '20220280700',
  '육군훈련소' = '20020191700',
  '육군훈련소(23연대)' = '20020191800',
  '육군훈련소(25연대)' = '20020191900',
  '육군훈련소(26연대)' = '20020192000',
  '육군훈련소(27연대)' = '20020192100',
  '육군훈련소(28연대)' = '20020192200',
  '육군훈련소(29연대)' = '20020192300',
  '육군훈련소(30연대)' = '20020192400',
}

type SoldierUnitName =
  '1사단' |
  '2사단' |
  '3사단' |
  '5사단' |
  '6사단' |
  '7사단' |
  '9사단' |
  '11사단' |
  '12사단' |
  '15사단' |
  '17사단' |
  '20사단' |
  '21사단' |
  '22사단' |
  '23사단' |
  '25사단' |
  '27사단' |
  '28사단' |
  '30사단' |
  '31사단' |
  '32사단' |
  '35사단' |
  '36사단' |
  '37사단' |
  '39사단' |
  '50사단' |
  '51사단' |
  '53사단' |
  '육군훈련소' |
  '육군훈련소(23연대)' |
  '육군훈련소(25연대)' |
  '육군훈련소(26연대)' |
  '육군훈련소(27연대)' |
  '육군훈련소(28연대)' |
  '육군훈련소(29연대)' |
  '육군훈련소(30연대)';

/**
 * 관계 코드
 */
enum SoldierRelationship {
  PARENT = '0000420001', // 부모
  SPOUSE = '0000420003', // 배우자
  SIBLING = '0000420002', // 형제/자매
  FRIEND = '0000420006', // 친구/지인
  LOVER = '0000420005', // 애인
  RELATIVE = '0000420004', // 친척
  FAN = '0000420007', // 팬
}

/**
 * 군인 정보
 * @class Soldier
 */
class Soldier {
  private missSoldierClassCdNm: SoldierClassName; // 성분
  private missSoldierClassCd: SoldierClass; // 성분 코드
  private grpCdNm: SoldierGroupName; // 군종
  private grpCd: SoldierGroup; // 군종 코드
  private name: string; // 이름
  private birth: string; // 생년월일 (YYYYMMDD)
  private enterDate: string; // 입열 날짜 (YYYYMMDD)
  private trainUnitCdNm: SoldierUnitName; // 입영부대
  private trainUnitCd: SoldierUnit; // 입영부대 코드
  private missSoldierRelationshipCd: SoldierRelationship; // 관계 코드
  private traineeMgrSeq?: string; // 훈련병 식별 코드

  /**
   * Soldier.인스턴스를 생성한다.
   * @param {string} name 이름 (e.g., `'박뫄뫄'`)
   * @param {string} birth 생년월일 (e.g., `'20011129'`)
   * @param {string} enterDate 입영날짜 (e.g., `'20200829'`)
   * @param {SoldierClassName} className 성분 (e.g., `'예비군인/훈련병'`)
   * @param {SoldierGroupName} groupName 군종 (e.g., `'육군'`)
   * @param {SoldierUnitName} unitName 입영부대 (e.g., `'28사단'`, `'육군훈련소(25연대)'`)
   * @param {SoldierRelationship} relationship 관계 (e.g., `SoldierRelationship.FRIEND`)
   * @memberof Soldier
   */
  constructor(
    name: string,
    birth: string,
    enterDate: string,
    className: SoldierClassName,
    groupName: SoldierGroupName,
    unitName: SoldierUnitName,
    relationship: SoldierRelationship,
  ) {
    this.name = name;
    this.birth = birth;
    this.enterDate = enterDate;
    this.missSoldierClassCdNm = className;
    this.missSoldierClassCd = SoldierClass[className];
    this.grpCdNm = groupName;
    this.grpCd = SoldierGroup[groupName];
    this.trainUnitCdNm = unitName;
    this.trainUnitCd = SoldierUnit[unitName];
    this.missSoldierRelationshipCd = relationship;
  }

  /**
   * 인스턴스를 복제한다.
   * @returns 같은 속성을 가진 Soldier 인스턴스
   * @memberof Soldier
   */
  public clone() {
    return new Soldier(
      this.name,
      this.birth,
      this.enterDate,
      this.missSoldierClassCdNm,
      this.grpCdNm,
      this.trainUnitCdNm,
      this.missSoldierRelationshipCd,
    );
  }

  /**
   * 이름을 반환한다.
   * @returns 이름 (e.g., `'박뫄뫄'`)
   * @memberof Soldier
   */
  public getName() {
    return this.name;
  }

  /**
   * 생년월일을 반환한다.
   * @returns 생년월일 (e.g., `'20011129'`)
   * @memberof Soldier
   */
  public getBirth() {
    return this.birth;
  }

  /**
   * 입영날짜를 반환한다.
   * @returns 입영날짜 (e.g., `'20200829'`)
   * @memberof Soldier
   */
  public getEnterDate() {
    return this.enterDate;
  }

  /**
   * 성분을 반환한다.
   * @returns 성분 (e.g., `'예비군인/훈련병'`)
   * @memberof Soldier
   */
  public getMissSoldierClassCdNm() {
    return this.missSoldierClassCdNm;
  }

  /**
   * 군종을 반환한다.
   * @returns 군종 (e.g., `'육군'`)
   * @memberof Soldier
   */
  public getGrpCdNm() {
    return this.grpCdNm;
  }

  /**
   * 군종 코드를 반환한다.
   * @returns 군종 코드 (e.g., `'0000010001'`)
   * @memberof Soldier
   */
  public getGrpCd() {
    return this.grpCd;
  }

  /**
   * 성분 코드를 반환한다.
   * @returns 성분 코드 (e.g., `'0000490001'`)
   * @memberof Soldier
   */
  public getMissSoldierClassCd() {
    return this.missSoldierClassCd;
  }

  /**
   * 훈련병 식별 코드를 반환한다.
   * @returns 훈련병 식별 코드
   * @memberof Soldier
   */
  public getTraineeMgrSeq() {
    return this.traineeMgrSeq;
  }

  /**
   * 입영부대 코드를 반환한다.
   * @returns 입영부대 코드 (`'20121290100'`)
   * @memberof Soldier
   */
  public getTrainUnitCd() {
    return this.trainUnitCd;
  }

  /**
   * 훈련병 식별 코드를 설정한다.
   * @param {string} traineeMgrSeq 훈련병 식별 코드
   * @memberof Soldier
   */
  public setTraineeMgrSeq(traineeMgrSeq: string) {
    this.traineeMgrSeq = traineeMgrSeq;
  }
}

export { Soldier, SoldierClass, SoldierClassName, SoldierGroup, SoldierGroupName, SoldierUnit, SoldierUnitName, SoldierRelationship };
