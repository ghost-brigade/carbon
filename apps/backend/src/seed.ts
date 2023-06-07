import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import UserSeed from "./core/seed/user.seed";
import UserPreferenceSeed from "./core/seed/user-preference.seed";
import SkillSeed from "./core/seed/skill.seed";
import UserSkillSeed from "./core/seed/user-skill.seed";
import MissionSeed from "./core/seed/mission.seed";
import SocietiesSeed from "./core/seed/society.seed";
import SchoolSeed from "./core/seed/school.seed";

const prisma = new PrismaClient();

/**
 * Load environment variables from .env file
 */
config();

async function main() {
  const skills = await SkillSeed();
  const users = await UserSeed();

  const societies = await SocietiesSeed();

  const missions = await MissionSeed(users, societies);
  const schools = await SchoolSeed(users);

  const usersSkills = await UserSkillSeed(users, skills);
  const usersPreferences = await UserPreferenceSeed(users);
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
