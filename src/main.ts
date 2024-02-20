import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 엔트리 포인트, 의존성 주입도 여기서 시작됨.

  await app.listen(5050);
}
bootstrap();
