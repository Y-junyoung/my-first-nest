import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // 인스턴시에이트 할때 자동으로!!
    await this.$connect();
    //  const prismaClient = new PrismaClient();
    //   this.prismaClient = prismaClient;
  }
}
