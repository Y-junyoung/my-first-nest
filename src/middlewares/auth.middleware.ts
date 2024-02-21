import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { verify } from 'jsonwebtoken';
import { ParsedQs } from 'qs';
import { PrismaService } from 'src/db/prisma/prisma.service';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) throw new Error('No JWT_SECRET_KEY!');

@Injectable()
export class AuthMiddleware implements NestMiddleware<Request, Response> {
  constructor(private readonly prismaService: PrismaService) {}
  async use(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: (error?: any) => void,
  ) {
    req.user = null;

    /**인증 관련 처리
     * 토큰 검사
     * 토큰 있는지 먼저
     * ㄴ토큰 없어? 일단 통과 -> 아무 것도 안해 줌
     * ㄴ토큰 있어? 토큰 유효한지 확인
     * ㄴ토큰 유효하지 않음 -> 돌아가~ 에러 발생
     * ㄴ토큰 유효 -> 유저 가져옴
     * ㄴ유저 없음 -> 에러 발생!(삭제된 유저일 가능성이 높음)
     * ㄴ유저 있음 -> 이후의 프로세스에서 유저를 사용할 수 있도록 req.user에 user를 넣어줌
     */

    const accessToken = req.headers.authorization?.split('Bearer ')[1];
    if (!accessToken) return next();

    let id;

    try {
      const { sub } = verify(accessToken, JWT_SECRET_KEY);
      id = Number(sub);
    } catch (e) {
      throw new UnauthorizedException('Invalid AccessToken');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) throw new BadRequestException('Deleted User!');

    req.user = user;

    next();
  }
}
