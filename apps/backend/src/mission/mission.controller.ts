import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { MissionService } from "./mission.service.";
import { MissionType, MissionCreateType, MissionUpdateType, MissionSchema, MissionCreateSchema, MissionUpdateSchema} from "@carbon/zod";
import { ZodGuard } from "../core/guard/zod/zod.guard";

@Controller("mission")
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  @UseGuards(new ZodGuard("body", MissionCreateSchema))
  async create(@Body() createMission: MissionCreateType) {
    return await this.missionService.create(createMission);
  }

  @Get()
  async findAll() {
    return await this.missionService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.missionService.findOne(id);
  }

  @Put(":id")
  @UseGuards(new ZodGuard("body", MissionUpdateSchema))
  async update(@Param("id") id: string, @Body() updateMission: MissionUpdateType) {
    return await this.missionService.update(id, updateMission);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.missionService.remove(id);
  }


}
