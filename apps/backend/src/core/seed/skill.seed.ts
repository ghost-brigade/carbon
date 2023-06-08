import { PrismaClient } from "@prisma/client";
import { FrameworkValues } from "../../../../../libs/enum/src/framework.enum";
const prisma = new PrismaClient();

export default async (): Promise<any[]> => {
  const skills: any[] = [];
  const frameworkValues = Object.keys(FrameworkValues);

  for (let i = 0; i < frameworkValues.length; i++) {
    const skill = await prisma.skill.create({
      data: {
        name: FrameworkValues[frameworkValues[i]],
      },
    });

    skills.push(skill);
  }

  return skills;
};
