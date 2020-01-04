/**
 * 인터넷 편지 정보
 * @class Message
 */
class Message {
  private sympathyLetterSubject: string; // 편지 제목
  private sympathyLetterContent: string; // 편지 내용
  private traineeMgrSeq: string; // 훈련병 식별 코드

  /**
   * Message 인스턴스를 생성한다.
   * @param {string} title 편지 제목 (e.g., `'Title'`)
   * @param {string} content 편지 내용 (1500자 이하, e.g., `'Content'`)
   * @param {string} traineeId 훈련병 식별 코드
   * @memberof Message
   */
  constructor(title: string, content: string, traineeId: string) {
    this.sympathyLetterSubject = title;
    this.sympathyLetterContent = content;
    this.traineeMgrSeq = traineeId;
  }

  /**
   * 제목을 반환한다.
   * @returns 제목
   * @memberof Message
   */
  public getSympathyLetterSubject() {
    return this.sympathyLetterSubject;
  }

  /**
   * 내용을 반환한다.
   * @returns 내용
   * @memberof Message
   */
  public getSympathyLetterContent() {
    return this.sympathyLetterContent;
  }

  /**
   * 훈련병 식별 코드를 반환한다.
   * @returns 훈련병 식별 코드
   * @memberof Message
   */
  public getTraineeMgrSeq() {
    return this.traineeMgrSeq;
  }
}

export { Message };
