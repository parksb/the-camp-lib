/**
 * 훈련병과의 관계
 */
enum Relationship {
  MOTHER = '어머니',
  FATHER = '아버지',
  SPOUSE = '배우자',
  GRANDPARENTS = '조부모',
  SIBLING = '형제/남매',
  FRIEND = '친구',
  LOVER = '애인',
  RELATIVE = '친척',
}

/**
 * 훈련병 정보
 */
interface Trainee {
  unitCode: string; // 연대/사단 식별 코드
  groupId: string; // 카페 식별 코드
  traineeName: string; // 훈련병 이름
  birth: number; // 훈령병 생년 월일 (YYYYMMDD)
  relationship: Relationship; // 훈령병과의 관계
}

export { Trainee, Relationship };
