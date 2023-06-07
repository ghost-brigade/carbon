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
import { MissionService } from "./mission.service";
import {
  MissionType,
  MissionCreateType,
  MissionUpdateType,
  MissionSchema,
  MissionCreateSchema,
  MissionUpdateSchema,
} from "@carbon/zod";
import { ZodGuard } from "../core/guard/zod/zod.guard";
import { Public } from "../core/decorators/public.decorator";

@Controller("mission")
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  @Public()
  @UseGuards(new ZodGuard("body", MissionCreateSchema))
  async create(@Body() createMission: MissionCreateType) {
    return await this.missionService.create(createMission);
  }

  @Get()
  @Public()
  async findAll() {
    return await this.missionService.findAll();
  }

  @Get(":id")
  @Public()
  async findOne(@Param("id") id: string) {
    return await this.missionService.findOne(id);
  }

  @Put(":id")
  @Public()
  @UseGuards(new ZodGuard("body", MissionUpdateSchema))
  async update(
    @Param("id") id: string,
    @Body() updateMission: MissionUpdateType
  ) {
    return await this.missionService.update(id, updateMission);
  }

  @Delete(":id")
  @Public()
  async remove(@Param("id") id: string) {
    return await this.missionService.remove(id);
  }
}
