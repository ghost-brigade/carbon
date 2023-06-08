import { UserType } from "@carbon/zod";
import { faker } from "@faker-js/faker/locale/fr";
import { RolesValues } from "../../../../../libs/enum/src/role.enum";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (): Promise<UserType[]> => {
  const users = [];
  const domain = "carbon-it.fr";

  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@${domain}`,
        password: await bcrypt.hash("password", 10),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthDate: faker.date.past(),
        salary: [
          JSON.stringify({
            amount: faker.finance.amount(),
            date: faker.date.past(),
          }),
        ],
        role: RolesValues[
          Math.floor((Math.random() * Object.keys(RolesValues).length) / 2)
        ],
        entryDate: faker.date.past(),
        experience: faker.number.int({ min: 0, max: 100000 }),
      },
    });

    users.push(user);
  }

  return users;
};
