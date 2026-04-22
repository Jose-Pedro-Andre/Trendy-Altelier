import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserRepository } from './user/repository/user.repository';
import { TaskService } from './task/task.service';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, TaskModule],
  controllers: [AppController, UserController, AuthController, TaskController],
  providers: [AppService, UserService, AuthService, UserRepository, TaskService],
})
export class AppModule {}
