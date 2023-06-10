import { UserType } from "@carbon/zod";
import { faker } from "@faker-js/faker/locale/fr";
import { RolesValues } from "../../../../../libs/enum/src/role.enum";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (): Promise<UserType[]> => {
  const usersDataset = [
    {
      email: "julien@esgi.fr",
      firstName: "Julien",
      lastName: "Arbellinitoci",
      role: RolesValues.USER,
    },
    {
      email: "louis@esgi.fr",
      firstName: "Louis",
      lastName: "Mouline",
      role: RolesValues.USER,
    },
    {
      email: "anthony@esgi.fr",
      firstName: "Anthony",
      lastName: "Arjojo",
      role: RolesValues.USER,
    },
    {
      email: "alexis@esgi.fr",
      firstName: "Alexis",
      lastName: "Loursbrun",
      role: RolesValues.USER,
    },
    {
      email: "stanley@esgi.fr",
      firstName: "Stanley",
      lastName: "Cricoco",
      role: RolesValues.USER,
    },
    {
      email: "stanley@esgi.fr",
      firstName: "Loudovic",
      lastName: "Regex Harrison",
      role: RolesValues.USER,
    },
    {
      email: "solene@carbon-it.fr",
      firstName: "Solène",
      lastName: "Ancel",
      role: RolesValues.HR,
    },
    {
      email: "christophe@carbon-it.fr",
      firstName: "Christophe",
      lastName: "Arrestier",
      role: RolesValues.COMMERCIAL,
    },
  ];

  const users = [];

  for (const user of usersDataset) {
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
    users.push(newUser);
  }

  return users;
};
