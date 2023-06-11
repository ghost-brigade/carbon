import { Module } from "@nestjs/common";
import { TaskListService } from "./tasklist.service";
import { TaskListController } from "./tasklist.controller";
import { PrismaService } from "../prisma.service";
import { SkillService } from "../skill/skill.service";

@Module({
  imports: [],
  controllers: [TaskListController],
  providers: [TaskListService, PrismaService, SkillService],
})
export class TaskListModule {}
