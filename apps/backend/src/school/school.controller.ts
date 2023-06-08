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
import { SchoolService } from "./school.service";
import { SchoolCreateSchema, SchoolCreateType, SchoolUpdateSchema, SchoolUpdateType } from "@carbon/zod";
import { Public } from "../core/decorators/public.decorator";
import { ZodGuard } from "../core/guard/zod/zod.guard";

@Controller("school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @UseGuards(new ZodGuard("body", SchoolCreateSchema))
  @Post()
  async create(@Body() createSchool: SchoolCreateType) {
    return this.schoolService.create(createSchool);
  }

  @Get()
  async findAll() {
    return this.schoolService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.schoolService.findOne(id);
  }

  @UseGuards(new ZodGuard("body", SchoolUpdateSchema))
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateSchool: SchoolUpdateType) {
    return await this.schoolService.update(id, updateSchool);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.schoolService.remove(id);
  }
}
