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

enum SoldierClassName {
  '예비군인/훈련병' = '예비군인/훈련병',
  '병사' = '병사',
  '장교' = '장교',
  '부사관' = '부사관',
  '군무원' = '군무원',
}

/**
 * 군종 코드
 */
enum SoldierGroup {
  '육군' = '0000010001',
  '해군' = '0000010002',
  '공군' = '0000010003',
  '해병대' = '0000010004',
}

enum SoldierGroupName {
  '육군' = '육군',
  '해군' = '해군',
  '공군' = '공군',
  '해병대' = '해병대',
}

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

enum SoldierUnitName {
  '1사단' = '1사단',
  '2사단' = '2사단',
  '3사단' = '3사단',
  '5사단' = '5사단',
  '6사단' = '6사단',
  '7사단' = '7사단',
  '9사단' = '9사단',
  '11사단' = '11사단',
  '12사단' = '12사단',
  '15사단' = '15사단',
  '17사단' = '17사단',
  '20사단' = '20사단',
  '21사단' = '21사단',
  '22사단' = '22사단',
  '23사단' = '23사단',
  '25사단' = '25사단',
  '27사단' = '27사단',
  '28사단' = '28사단',
  '30사단' = '30사단',
  '31사단' = '31사단',
  '32사단' = '32사단',
  '35사단' = '35사단',
  '36사단' = '36사단',
  '37사단' = '37사단',
  '39사단' = '39사단',
  '50사단' = '50사단',
  '51사단' = '51사단',
  '53사단' = '53사단',
  '육군훈련소' = '육군훈련소',
  '육군훈련소(23연대)' = '육군훈련소(23연대)',
  '육군훈련소(25연대)' = '육군훈련소(25연대)',
  '육군훈련소(26연대)' = '육군훈련소(26연대)',
  '육군훈련소(27연대)' = '육군훈련소(27연대)',
  '육군훈련소(28연대)' = '육군훈련소(28연대)',
  '육군훈련소(29연대)' = '육군훈련소(29연대)',
  '육군훈련소(30연대)' = '육군훈련소(30연대)',
}

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
 */
class Soldier {
  private missSoldierClassCdNm: SoldierClassName; // 성분
  private missSoldierClassCd: SoldierClass; // 성분 코드
  private grpCdNm: SoldierGroupName; // 군종
  private grpCd: SoldierGroup; // 군종 코드
  private name: string; // 이름
  private birth: string; // 생년월일 (YYYY-MM-DD)
  private enterDate: string; // 입열 날짜 (YYYY-MM-DD)
  private trainUnitCd: SoldierUnit; // 입영부대 코드
  private trainUnitNm: SoldierUnitName;
  private missSoldierRelationshipCd: SoldierRelationship; // 관계 코드
  private traineeMgrSeq?: string; // 훈련병 식별 코드

  constructor(
    name: string,
    birth: string,
    enterDate: string,
    className: string,
    groupName: string,
    unitName: string,
    relationship: SoldierRelationship,
  ) {
    this.name = name;
    this.birth = birth;
    this.enterDate = enterDate;
    this.missSoldierClassCdNm = SoldierClassName[className];
    this.missSoldierClassCd = SoldierClass[className];
    this.grpCdNm = SoldierGroupName[groupName];
    this.grpCd = SoldierGroup[groupName];
    this.trainUnitNm = SoldierUnitName[unitName];
    this.trainUnitCd = SoldierUnit[unitName];
    this.missSoldierRelationshipCd = relationship;
  }

  public clone() {
    return new Soldier(
      this.name,
      this.birth,
      this.enterDate,
      this.missSoldierClassCdNm,
      this.grpCdNm,
      this.trainUnitNm,
      this.missSoldierRelationshipCd,
    );
  }

  public getName() {
    return this.name;
  }

  public getBirth() {
    return this.birth;
  }

  public getEnterDate() {
    return this.enterDate;
  }

  public getMissSoldierClassCdNm() {
    return this.missSoldierClassCdNm;
  }

  public getGrpCdNm() {
    return this.grpCdNm;
  }

  public getGrpCd() {
    return this.grpCd;
  }

  public getMissSoldierClassCd() {
    return this.missSoldierClassCd;
  }

  public getTraineeMgrSeq() {
    return this.traineeMgrSeq;
  }

  public getTrainUnitCd() {
    return this.trainUnitCd;
  }

  public setTraineeMgrSeq(traineeMgrSeq: string) {
    this.traineeMgrSeq = traineeMgrSeq;
  }
}

export { Soldier, SoldierClass, SoldierGroup, SoldierUnit, SoldierRelationship };
