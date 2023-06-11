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
  Query,
} from "@nestjs/common";
import { MissionService } from "./mission.service";
import {
  MissionCreateType,
  MissionUpdateType,
  MissionCreateSchema,
  MissionUpdateSchema,
  MissionParamsType,
  UserType,
} from "@carbon/zod";
import { ZodGuard } from "../core/guard/zod/zod.guard";
import { AuthorizationGuard } from "../core/guard/authorization.guard";
import { RolesValues } from "@carbon/enum";
import { UserContext } from "../core/decorators/user-context.decorator";
import { AverageDailyRatingInterceptor } from "../core/interceptors/average-daily-rating.interceptor";

@Controller("mission")
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  @UseInterceptors(new AverageDailyRatingInterceptor())
  @UseGuards(new ZodGuard("body", MissionCreateSchema))
  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
  async create(@Body() createMission: MissionCreateType) {
    return await this.missionService.create(createMission);
  }

  @Get()
  @UseInterceptors(new AverageDailyRatingInterceptor())
  async findAll(@Query() params?: MissionParamsType) {
    return await this.missionService.findAll({ params });
  }

  @Get(":id")
  @UseInterceptors(new AverageDailyRatingInterceptor())
  async findOne(@Param("id") id: string) {
    return await this.missionService.findOne(id);
  }

  @Put(":id")
  @UseInterceptors(new AverageDailyRatingInterceptor())
  @UseGuards(new ZodGuard("body", MissionUpdateSchema))
  async update(
    @Param("id") id: string,
    @Body() updateMission: MissionUpdateType,
    @UserContext() user: UserType
  ) {
    return await this.missionService.update(id, updateMission, user);
  }

  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.missionService.remove(id);
  }
}
