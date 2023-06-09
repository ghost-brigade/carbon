import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "../prisma.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UserAvatarInterceptor } from "../core/interceptors/user-avatar.interceptor";
import { FileService } from "../file/file.service";

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    FileService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserAvatarInterceptor,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
