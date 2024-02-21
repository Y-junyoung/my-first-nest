import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { Express } from 'express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/httpExeption.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication<Express>>(AppModule);
  // 엔트리 포인트, 의존성 주입도 여기서 시작됨.
  app.use(cors());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(5050);
}
bootstrap();
