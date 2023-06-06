import { AuthenticationModule } from "./authentication/authentication.module";
import { AuthGuard } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { SkillModule } from "./skills/skill.module";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule, AuthenticationModule, SkillModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
