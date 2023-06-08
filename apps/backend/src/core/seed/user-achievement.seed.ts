import { UserType } from "@carbon/zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (users: UserType[]): Promise<UserType[]> => {
  const usersAchievements: any[] = [];

  const achievements = [
    {
      id: "schools-1",
      description: "Participer à une présentation en école",
    },
    {
      id: "schools-2",
      description: "Participer à deux présentations en école",
    },
    {
      id: "schools-3",
      description: "Participer à trois présentations en école",
    },
    {
      id: "schools-4",
      description: "Participer à quatre présentations en école",
    },
    {
      id: "schools-5",
      description: "Participer à cinq présentations en école",
    },
    {
      id: "talks-1",
      description: "Présenter une conférence",
    },
    {
      id: "talks-2",
      description: "Présenter deux conférences",
    },
    {
      id: "talks-3",
      description: "Présenter trois conférences",
    },
    {
      id: "talks-4",
      description: "Présenter quatre conférences",
    },
    {
      id: "talks-5",
      description: "Présenter cinq conférences",
    },
    {
      id: "innovator-1",
      description: "Présenter une nouvelle technologie au sein de l'entreprise",
    },
    {
      id: "innovator-2",
      description:
        "Présenter deux nouvelles technologies au sein de l'entreprise",
    },
    {
      id: "innovator-3",
      description:
        "Présenter trois nouvelles technologies au sein de l'entreprise",
    },
    {
      id: "innovator-4",
      description:
        "Présenter quatre nouvelles technologies au sein de l'entreprise",
    },
    {
      id: "innovator-5",
      description:
        "Présenter cinq nouvelles technologies au sein de l'entreprise",
    },
    {
      id: "startup-1",
      description: "Livrer un projet",
    },
    {
      id: "startup-2",
      description: "Livrer deux projets",
    },
    {
      id: "startup-3",
      description: "Livrer trois projets",
    },
    {
      id: "startup-4",
      description: "Livrer quatre projets",
    },
    {
      id: "startup-5",
      description: "Livrer cinq projets",
    },
    {
      id: "trophy-1",
      description: "Atteindre le top 1 dans un leaderboard",
    },
    {
      id: "trophy-2",
      description: "Atteindre le top 1 dans deux leaderboards",
    },
    {
      id: "trophy-3",
      description: "Atteindre le top 1 dans trois leaderboards",
    },
    {
      id: "trophy-4",
      description: "Atteindre le top 1 dans quatre leaderboards",
    },
    {
      id: "trophy-5",
      description: "Atteindre le top 1 dans cinq leaderboards",
    },
    {
      id: "elder-1",
      description: "Plus d'un an d'ancienneté!",
    },
    {
      id: "elder-2",
      description: "Plus de deux ans d'ancienneté!",
    },
    {
      id: "elder-3",
      description: "Plus de trois ans d'ancienneté!",
    },
    {
      id: "elder-4",
      description: "Plus de quatre ans d'ancienneté!",
    },
    {
      id: "elder-5",
      description: "Plus de cinq ans d'ancienneté!",
    },
  ];

  for (let i = 0; i < 30; i++) {
    const currentAchievement =
      achievements[Math.floor(Math.random() * achievements.length)];
    const userAchievement = await prisma.userAchievement.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        achievement: currentAchievement.id,
        description: currentAchievement.description,
      },
    });

    usersAchievements.push(userAchievement);
  }

  return usersAchievements;
};
