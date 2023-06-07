import { Module } from "@nestjs/common";
import { MissionService } from "./mission.service";
import { MissionController } from "./mission.controller";
import { PrismaService } from "../prisma.service";
import { SocietyService } from "../society/society.service";

@Module({
  controllers: [MissionController],
  providers: [MissionService, PrismaService, SocietyService],
  exports: [MissionService],
})
export class MissionModule {}
