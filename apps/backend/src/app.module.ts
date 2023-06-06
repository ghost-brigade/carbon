import { AuthenticationModule } from "./authentication/authentication.module";
import { Module } from "@nestjs/common";
import { SkillModule } from "./skill/skill.module";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "./user/user.module";
import { JwtAuthGuard } from "./core/guard/passport/jwt-auth.guard";

@Module({
  imports: [UserModule, AuthenticationModule, SkillModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
