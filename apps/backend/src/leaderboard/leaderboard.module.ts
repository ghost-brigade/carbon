import { PrismaService } from "./../prisma.service";
import { Module } from "@nestjs/common";
import { LeaderboardController } from "./leaderboard.controller";
import { UserService } from "../user/user.service";

@Module({
  controllers: [LeaderboardController],
  providers: [PrismaService, UserService],
})
export class LeaderboardModule {}
