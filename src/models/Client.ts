import * as service from '../services';

import { Cookie } from './Cookie';
import { Soldier } from './Soldier';
import { Message } from './Message';

/**
 * 더캠프 클라이언트
 * @class Client
 */
class Client {
  cookies?: Cookie; // 세션 식별을 위한 쿠키

  /**
   * 로그인을 강제한다.
   */
  private enforceLogin() {
    if (!this.cookies || !this.cookies.iuid || !this.cookies.token) {
      throw new Error('로그인이 필요한 서비스입니다.');
    }
  }

  /**
   * 로그인한다.
   * @param id 계정 아이디
   * @param password 계정 비밀번호
   */
  async login(id: string, password: string) {
    this.cookies = await service.login(id, password);
  }

  /**
   * 군인을 추가한다.
   * @param soldier - 추가할 군인 정보
   */
  async addSoldier(soldier: Soldier) {
    this.enforceLogin();
    await service.addSoldier(this.cookies!, soldier);
  }

  /**
   * 군인 정보를 가져온다.
   * @param soldier - 확인할 군인 정보
   */
  async fetchSoldiers(soldier: Soldier) {
    this.enforceLogin();
    return service.fetchSoldiers(this.cookies!, soldier);
  }

  /**
   * 인터넷 편지를 전송한다.
   * @param soldier - 훈련병 정보
   * @param message - 인터넷 편지 정보
   */
  async sendMessage(soldier: Soldier, message: Message) {
    this.enforceLogin();
    await service.sendMessage(this.cookies!, soldier, message);
  }
}

export { Client };
