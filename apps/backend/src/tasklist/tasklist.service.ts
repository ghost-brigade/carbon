import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { TaskList, Prisma } from "@prisma/client";
import { TaskListCreateType, TaskListType, TaskListUpdateType } from "@carbon/zod";

@Injectable()
export class TaskListService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskList: TaskListCreateType): Promise<TaskList> {
    try {
      return this.prisma.taskList.create({
        data: {
          name: createTaskList.name,
          level: createTaskList.level,
          description: createTaskList.description,
          skillId: createTaskList.skillId,
          required: createTaskList.required,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while creating taskList");
    }
  }

  async findAll(): Promise<TaskListType[]> {
    try {
      return await this.prisma.taskList.findMany();
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching taskLists");
    }
  }

  async findOne(id: string): Promise<TaskListType> {
    try {
      return await this.prisma.taskList.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching taskList");
    }
  }

  async update(id: string, updateTaskList: TaskListUpdateType): Promise<TaskListType> {
    try {
      return (await this.prisma.taskList.update({
        where: { id },
        data: updateTaskList,
      })) as TaskListType;
    } catch (error) {
      throw new InternalServerErrorException("Error while updating taskList");
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.taskList.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException("Error while deleting taskList");
    }
  }
}
