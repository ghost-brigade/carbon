import { AuthenticationModule } from "./authentication/authentication.module";
import { Module } from "@nestjs/common";
import { SkillModule } from "./skill/skill.module";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "./user/user.module";
import { JwtAuthGuard } from "./core/guard/passport/jwt-auth.guard";
import { PrismaService } from "./prisma.service";
import { FileModule } from "./file/file.module";
import { SocietyModule } from "./society/society.module";

@Module({
  imports: [UserModule, AuthenticationModule, SkillModule, FileModule, SocietyModule],
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
