import { UserType } from "@carbon/zod";
import { faker } from "@faker-js/faker/locale/fr";
import { RolesValues } from "../../../../../libs/enum/src/role.enum";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { S3Client } from "@aws-sdk/client-s3";

const prisma = new PrismaClient();

export default async (S3: S3Client): Promise<UserType[]> => {
  const usersDataset = [
    {
      email: "julien@esgi.fr",
      firstName: "Julien",
      lastName: "Arbellinitoci",
      avatar: "./avatar/julien.jpg",
      role: RolesValues.USER,
    },
    {
      email: "louis@esgi.fr",
      firstName: "Louis",
      lastName: "Mouline",
      avatar: "./avatar/louis.jpg",
      role: RolesValues.USER,
    },
    {
      email: "anthony@esgi.fr",
      firstName: "Anthony",
      lastName: "Arjojo",
      avatar: "./avatar/anthony.jpg",
      role: RolesValues.USER,
    },
    {
      email: "alexis@esgi.fr",
      firstName: "Alexis",
      lastName: "Loursbrun",
      avatar: "./avatar/alexis.jpg",
      role: RolesValues.USER,
    },
    {
      email: "solene@carbon-it.fr",
      firstName: "Solène",
      lastName: "Ancel",
      avatar: "./avatar/solene.jpg",
      role: RolesValues.HR,
    },
    {
      email: "christophe@carbon-it.fr",
      firstName: "Christophe",
      lastName: "Arrestier",
      avatar: "./avatar/christophe.jpg",
      role: RolesValues.COMMERCIAL,
    },
  ];
  const users: UserType[] = [];

  for (const user of usersDataset) {
    const 

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: await bcrypt.hash("password", 10),
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: faker.date.past(),
        salary: [
          JSON.stringify({
            amount: faker.finance.amount(),
            date: faker.date.past(),
          }),
        ],
        role: user.role,
        entryDate: faker.date.past(),
        experience: faker.number.int({ min: 0, max: 100000 }),
      },
    });

    users.push(newUser as UserType);
  }

  return users;
};
