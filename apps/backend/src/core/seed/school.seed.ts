import { UserType } from "@carbon/zod";
import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (users: UserType[]): Promise<any[]> => {
  const schools = [];

  const dataset = [
    "Epitech",
    "42",
    "Coding Academy",
    "ESGI",
    "Polytech",
    "Efrei",
  ];

  for (let i = 0; i < 20; i++) {
    const school = await prisma.school.create({
      data: {
        name: dataset[Math.floor(Math.random() * dataset.length)],
        userId: users[Math.floor(Math.random() * users.length)].id,
        dateStart: faker.date.past(),
        dateEnd: faker.date.future(),
        description: faker.lorem.paragraph(),
      },
    });

    schools.push(school);
  }

  return schools;
};
