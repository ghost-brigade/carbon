import { AuthenticationModule } from "./authentication/authentication.module";
import { Module } from "@nestjs/common";
import { SkillModule } from "./skill/skill.module";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "./user/user.module";
import { JwtAuthGuard } from "./core/guard/passport/jwt-auth.guard";
import { PrismaService } from "./prisma.service";
import { FileModule } from "./file/file.module";
import { SocietyModule } from "./society/society.module";
import { SchoolModule } from "./school/school.module";
import { TaskListModule } from "./tasklist/tasklist.module";
import { MissionModule } from "./mission/mission.module";
import { LeaderboardModule } from "./leaderboard/leaderboard.module";
import { NewsModule } from "./news/news.module";
import { UserPreferenceModule } from "./user-preference/user-preference.module";
import { EventModule } from "./event/event.module";

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    SkillModule,
    EventModule,
    FileModule,
    SocietyModule,
    SchoolModule,
    TaskListModule,
    MissionModule,
    LeaderboardModule,
    NewsModule,
    UserPreferenceModule,
  ],
  exports: [PrismaService],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
