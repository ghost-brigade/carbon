import { UserType } from "@carbon/zod";
import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (users: UserType[], societies: any[]): Promise<any[]> => {
  const missions = [];

  for (let i = 0; i < 30; i++) {
    const mission = await prisma.mission.create({
      data: {
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        dateStart: faker.date.past(),
        dateEnd: faker.date.between({
          from: new Date(),
          // max 3 years from now HR rules
          to: new Date(new Date().setFullYear(new Date().getFullYear() + 3)),
        }),
        rating: faker.number.int({ min: 0, max: 5 }),
        userId: users[Math.floor(Math.random() * users.length)].id,
        societyId: societies[Math.floor(Math.random() * societies.length)].id,
        averageDailyRate: faker.number.float({ min: 500, max: 1500 }),
        feedback: faker.lorem.paragraph(),
      },
    });

    missions.push(mission);
  }

  return missions;
};
