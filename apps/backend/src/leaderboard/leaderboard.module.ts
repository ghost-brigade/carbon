import { PrismaService } from "./../prisma.service";
import { Module } from "@nestjs/common";
import { LeaderboardController } from "./leaderboard.controller";
import { UserService } from "../user/user.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UserAvatarInterceptor } from "../core/interceptors/user-avatar.interceptor";
import { FileService } from "../file/file.service";

@Module({
  controllers: [LeaderboardController],
  providers: [
    PrismaService,
    UserService,
    FileService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserAvatarInterceptor,
    },
  ],
})
export class LeaderboardModule {}
