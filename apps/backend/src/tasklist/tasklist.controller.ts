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
import { TaskListService } from "./tasklist.service";
import { TaskListCreateSchema, TaskListCreateType, TaskListUpdateSchema, TaskListUpdateType } from "@carbon/zod";
import { Public } from "../core/decorators/public.decorator";
import { ZodGuard } from "../core/guard/zod/zod.guard";

@Controller("skill")
export class TaskListController {
  constructor(private readonly skillService: TaskListService) {}

  @UseGuards(new ZodGuard("body", TaskListCreateSchema))
  @Post()
  async create(@Body() createTaskList: TaskListCreateType) {
    return this.skillService.create(createTaskList);
  }

  @Get()
  async findAll() {
    return this.skillService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.skillService.findOne(id);
  }

  @UseGuards(new ZodGuard("body", TaskListUpdateSchema))
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateTaskList: TaskListUpdateType) {
    return await this.skillService.update(id, updateTaskList);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.skillService.remove(id);
  }
}
