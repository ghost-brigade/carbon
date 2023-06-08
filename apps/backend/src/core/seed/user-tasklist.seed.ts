import { PrismaClient, TaskList, User } from "@prisma/client";
import { TaskListStatusValues } from "../../../../../libs/enum/src/task-list-status.enum";

const prisma = new PrismaClient();

enum Status {
  VALIDATED = "VALIDATED",
  PENDING = "PENDING",
}

export default async (users: User[], taskList: TaskList[]): Promise<any[]> => {
  const userTaskLists: any[] = [];

  for (const user of users) {
    // Sort tasks by level
    const sortedTasks = taskList.sort((a, b) => a.level - b.level);

    const taskCompleted = Math.floor(Math.random() * sortedTasks.length);

    for (let i = 0; i <= taskCompleted; i++) {
      const userTaskList = await prisma.userTaskList.create({
        data: {
          userId: user.id,
          taskListId: sortedTasks[i].id,
          status: TaskListStatusValues.ACCEPTED,
        },
      });

      userTaskLists.push(userTaskList);
    }
  }

  return userTaskLists;
};
