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
import { AuthorizationGuard } from "../core/guard/authorization.guard";
import { RolesValues } from "@carbon/enum";

@Controller("taskList")
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @UseGuards(new ZodGuard("body", TaskListCreateSchema))
  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
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
  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTaskList: TaskListUpdateType
  ) {
    return await this.taskListService.update(id, updateTaskList);
  }

  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.taskListService.remove(id);
  }
}
