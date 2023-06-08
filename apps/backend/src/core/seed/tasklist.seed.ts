import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (skills: any[]): Promise<any[]> => {
  const tasklists = [];

  for (let i = 0; i < 10; i++) {
    const tasklist = await prisma.taskList.create({
      data: {
        name: faker.lorem.word(),
        level: faker.number.int({ min: 0, max: 100000 }),
        description: faker.lorem.word(),
        skillId: skills[Math.floor(Math.random() * skills.length)].id,
        required: faker.datatype.boolean(),
      },
    });

    tasklists.push(tasklist);
  }

  return tasklists;
};
