import { UserType } from "@carbon/zod";
import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";
import { Language } from "../../../../../libs/enum/src/language.enum";
import { FrameworkValues } from "../../../../../libs/enum/src/framework.enum";
const prisma = new PrismaClient();

export default async (users: UserType[]): Promise<UserType[]> => {
  const usersPreferences: any[] = [];

  for (let i = 0; i < 50; i++) {
    const userPreference = await prisma.userPreference.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        description:
          FrameworkValues[
            Object.keys(FrameworkValues)[
              Math.floor(Math.random() * Object.keys(FrameworkValues).length)
            ]
          ],
        isLiked: faker.datatype.boolean(),
      },
    });

    usersPreferences.push(userPreference);
  }

  return usersPreferences;
};
