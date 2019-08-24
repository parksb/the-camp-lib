/**
 * 인터넷 편지 정보
 */
interface Message {
  title: string; // 편지 제목
  content: string; // 편지 내용
  boardId?: string;
  fileInfo?: any[];
}

export { Message };
