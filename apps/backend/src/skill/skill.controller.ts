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
import { SkillCreateSchema, SkillCreateType, SkillUpdateSchema, SkillUpdateType } from "@carbon/zod";
import { Public } from "../core/decorators/public.decorator";
import { ZodGuard } from "../core/guard/zod/zod.guard";

@Controller("skill")
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @UseGuards(new ZodGuard("body", SkillCreateSchema))
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

  @UseGuards(new ZodGuard("body", SkillUpdateSchema))
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateSkill: SkillUpdateType) {
    return await this.skillService.update(id, updateSkill);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.skillService.remove(id);
  }
}
