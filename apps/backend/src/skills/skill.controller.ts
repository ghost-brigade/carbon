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
import { SkillCreateType } from "@carbon/zod";

@Controller("skill")
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  create(@Body() createSkill: SkillCreateType) {
    return this.skillService.create(createSkill);
  }

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.skillService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSkillDto) {
    return this.skillService.update(+id, updateSkillDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.skillService.remove(+id);
  }
}
