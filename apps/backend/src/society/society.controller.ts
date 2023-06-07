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
import { SocietyService } from "./society.service";
import { SocietyCreateSchema, SocietyCreateType, SocietyUpdateSchema, SocietyUpdateType } from "@carbon/zod";
import { Public } from "../core/decorators/public.decorator";
import { ZodGuard } from "../core/guard/zod/zod.guard";

@Controller("society")
export class SocietyController {
  constructor(private readonly societyService: SocietyService) {}

  @UseGuards(new ZodGuard("body", SocietyCreateSchema))
  @Post()
  @Public()
  async create(@Body() createSociety: SocietyCreateType) {
    return this.societyService.create(createSociety);
  }

  @Get()
  async findAll() {
    return this.societyService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.societyService.findOne(id);
  }

  @UseGuards(new ZodGuard("body", SocietyUpdateSchema))
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateSociety: SocietyUpdateType) {
    return await this.societyService.update(id, updateSociety);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.societyService.remove(id);
  }
}
