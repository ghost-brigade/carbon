import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import UserSeed from "./core/seed/user.seed";

const prisma = new PrismaClient();

/**
 * Load environment variables from .env file
 */
config();

async function main() {
  const users = await UserSeed();
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
