import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { faker } from "@faker-js/faker/locale/fr";
import { RolesValues } from "../../../libs/enum/src/role.enum";
const prisma = new PrismaClient();

/**
 * Load environment variables from .env file
 */
config();

async function main() {
  const emailDomain = "carbon-it.fr";

  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        email: `user${i}@${emailDomain}`,
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
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
