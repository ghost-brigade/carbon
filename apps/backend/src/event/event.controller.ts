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
import { EventService } from "./event.service";
import { EventSchema } from "@carbon/zod";
import { Public } from "../core/decorators/public.decorator";
import { ZodGuard } from "../core/guard/zod/zod.guard";

@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // @UseGuards(new ZodGuard("body", EventCreateSchema))
  // @Public()
  // @Post()
  // async create(@Body() createEvent: EventCreateType) {
  //   return this.eventService.create(createEvent);
  // }

  @Public()
  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  // @Public()
  // @Get(":id")
  // async findOne(@Param("id") id: string) {
  //   return await this.eventService.findOne(id);
  // }

  // @UseGuards(new ZodGuard("body", EventUpdateSchema))
  // @Patch(":id")
  // async update(@Param("id") id: string, @Body() updateEvent: EventUpdateType) {
  //   return await this.eventService.update(id, updateEvent);
  // }

  // @Delete(":id")
  // async remove(@Param("id") id: string) {
  //   return await this.eventService.remove(id);
  // }
}
