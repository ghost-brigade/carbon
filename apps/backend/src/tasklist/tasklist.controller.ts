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
import {
  TaskListCreateSchema,
  TaskListCreateType,
  TaskListUpdateSchema,
  TaskListUpdateType,
} from "@carbon/zod";
import { Public } from "../core/decorators/public.decorator";
import { ZodGuard } from "../core/guard/zod/zod.guard";

@Controller("taskList")
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @UseGuards(new ZodGuard("body", TaskListCreateSchema))
  @Public()
  @Post()
  async create(@Body() createTaskList: TaskListCreateType) {
    return this.taskListService.create(createTaskList);
  }

  @Get()
  async findAll() {
    return this.taskListService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.taskListService.findOne(id);
  }

  @UseGuards(new ZodGuard("body", TaskListUpdateSchema))
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTaskList: TaskListUpdateType
  ) {
    return await this.taskListService.update(id, updateTaskList);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.taskListService.remove(id);
  }
}
