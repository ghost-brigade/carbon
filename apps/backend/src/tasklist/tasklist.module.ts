import { Module } from '@nestjs/common';
import { TaskListService } from './tasklist.service';
import { TaskListController } from './tasklist.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [TaskListController],
  providers: [TaskListService, PrismaService]
})
export class TaskListModule {}
