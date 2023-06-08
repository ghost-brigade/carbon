import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (): Promise<any[]> => {
  const societies = [];

  for (let i = 0; i < 10; i++) {
    const society = await prisma.society.create({
      data: {
        name: faker.company.name(),
      },
    });

    societies.push(society);
  }

  return societies;
};
