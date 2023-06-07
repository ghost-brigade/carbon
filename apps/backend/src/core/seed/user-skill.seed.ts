import { SkillType, UserType } from "@carbon/zod";
import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (
  users: UserType[],
  skills: SkillType[]
): Promise<UserType[]> => {
  const usersSkills: any[] = [];

  for (let i = 0; i < 30; i++) {
    const userSkill = await prisma.userSkill.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        skillId: skills[Math.floor(Math.random() * skills.length)].id,
        level: faker.number.int({ min: 1, max: 5 }),
      },
    });

    usersSkills.push(userSkill);
  }

  return usersSkills;
};
