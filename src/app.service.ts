import { Injectable } from '@nestjs/common';

/**
 * 의존성 주입을 하기 위해 @Injectable 사용
 * 의존성 주입을 해야 Controller의 constructor에 매개변수로 넣을 수 있음
 */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
