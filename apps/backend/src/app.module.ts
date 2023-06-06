import { Module } from "@nestjs/common";
import { SkillModule } from "./skill/skill.module";

@Module({
  imports: [SkillModule],
})
export class AppModule {}
