import { SkillType, UserType } from "@carbon/zod";
import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (
  users: UserType[],
  skills: SkillType[]
): Promise<UserType[]> => {
  const usersSkills: any[] = [];

  for (let i = 0; i < users.length; i++) {
    const skillIds = [];
    for (let y = 0; y < 5; y++) {
      const skill = skills[Math.floor(Math.random() * skills.length)];
      if (!skillIds.includes(skill.id)) skillIds.push(skill.id);
    }
    for (let j = 0; j < skillIds.length; j++) {
      const userSkill = await prisma.userSkill.create({
        data: {
          userId: users[i].id,
          skillId: skillIds[j],
          level: faker.number.int({ min: 1, max: 5 }),
        },
      });
      usersSkills.push(userSkill);
    }
  }

  return usersSkills;
};
