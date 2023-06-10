import { UserType } from "@carbon/zod";
import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";
import { FrameworkValues } from "../../../../../libs/enum/src/framework.enum";
const prisma = new PrismaClient();

export default async (users: UserType[]) => {
  const frameworks = Object.values(FrameworkValues);

  const userPreferences = users.map(({ id }) =>
    frameworks
      .map((framework) => ({
        framework,
        hasPreference: faker.datatype.boolean(1 / 3),
      }))
      .filter(({ hasPreference }) => hasPreference)
      .map(({ framework }) => ({
        userId: id,
        description: framework,
        isLiked: faker.datatype.boolean(),
      }))
  );

  return prisma.userPreference.createMany({
    data: userPreferences.flat(),
  });
};
