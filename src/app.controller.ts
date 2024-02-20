import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 데코레이터 : 꾸며주는 것!
 * 편리하게 기능들을 넣어줄 수 있음
 * 대신 알지 못하면 어떤 것이 추가 된 것인지 파악하기 힘듦.
 */

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    // this.appService = appService 생략됨.
  }

  @Get() // get 방식의 리퀘스트를 핸들링하는 핸들러역할
  getHello(): string {
    return this.appService.getHello();
  }
}
