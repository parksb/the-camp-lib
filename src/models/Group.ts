/**
 * 가입 카페 정보
 */
interface Group {
  unitName: string; // 연대/사단 이름
  fullName: string; // 카페 전체 이름
  enterDate: string; // 훈련병 입소 날짜 (YYYYMMDD)
  groupId: string; // 카페 식별 코드
  groupName: string; // 카페 이름
  groupImage: string; // 카페 대표 이미지
  accessDate: string; // 요청 날짜
  unitCode: string; // 연대/사단 식별 코드
  unitType: number; // 육군훈련소(1)/사단신교대(2) 여부
  grade: number;
}

export { Group };
