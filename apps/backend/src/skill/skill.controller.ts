import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { SkillService } from "./skill.service";
import {
  SkillCreateSchema,
  SkillCreateType,
  SkillType,
  SkillUpdateSchema,
  SkillUpdateType,
} from "@carbon/zod";
import { ZodGuard } from "../core/guard/zod/zod.guard";
import { AuthorizationGuard } from "../core/guard/authorization.guard";
import { RolesValues } from "@carbon/enum";

@Controller("skill")
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @UseGuards(new ZodGuard("body", SkillCreateSchema))
  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
  @Post()
  async create(@Body() createSkill: SkillCreateType): Promise<SkillType> {
    return this.skillService.create(createSkill);
  }

  @Get()
  async findAll() {
    return this.skillService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.skillService.findOne(id);
  }

  @UseGuards(new ZodGuard("body", SkillUpdateSchema))
  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateSkill: SkillUpdateType) {
    return await this.skillService.update(id, updateSkill);
  }

  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.skillService.remove(id);
  }
}
