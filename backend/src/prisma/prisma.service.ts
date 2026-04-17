import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL não está definida no ambiente.');
    }

    super({
      adapter: new PrismaPg({ connectionString }),
    });
  }

  async onModuleInit(): Promise<void> {
    this.logger.log('Tentando conectar ao banco de dados via Prisma...');
    try {
      await this.$connect();
      this.logger.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
      this.logger.error('Falha ao conectar ao banco de dados via Prisma.', error);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Encerrando conexão com o banco de dados...');
    await this.$disconnect();
    this.logger.log('Conexão com o banco de dados encerrada.');
  }
}
