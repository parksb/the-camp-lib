/**
 * 인터넷 편지 정보
 */
class Message {
  private sympathyLetterSubject: string; // 편지 제목
  private sympathyLetterContent: string; // 편지 내용
  private traineeMgrSeq: string; // 훈련병 식별 코드

  constructor(title: string, content: string, traineeId: string) {
    this.sympathyLetterSubject = title;
    this.sympathyLetterContent = content;
    this.traineeMgrSeq = traineeId;
  }

  public getSympathyLetterSubject() {
    return this.sympathyLetterSubject;
  }

  public getSympathyLetterContent() {
    return this.sympathyLetterContent;
  }

  public getTraineeMgrSeq() {
    return this.traineeMgrSeq;
  }
}

export { Message };
