import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SkillService } from "./skill.service";
import { SkillCreateType, SkillUpdateType } from "@carbon/zod";

@Controller("skill")
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() createSkill: SkillCreateType) {
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

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateSkill: SkillUpdateType) {
    return await this.skillService.update(id, updateSkill);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.skillService.remove(id);
  }
}
