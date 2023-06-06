import { AuthenticationModule } from "./authentication/authentication.module";
import { Module } from "@nestjs/common";
import { SkillModule } from "./skills/skill.module";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "./user/user.module";
import { JwtAuthGuard } from "./core/guard/passport/jwt-auth.guard";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [UserModule, AuthenticationModule, SkillModule],
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
