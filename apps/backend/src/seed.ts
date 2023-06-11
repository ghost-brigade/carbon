import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import UserSeed from "./core/seed/user.seed";
import UserPreferenceSeed from "./core/seed/user-preference.seed";
import SkillSeed from "./core/seed/skill.seed";
import UserSkillSeed from "./core/seed/user-skill.seed";
import MissionSeed from "./core/seed/mission.seed";
import SocietiesSeed from "./core/seed/society.seed";
import SchoolSeed from "./core/seed/school.seed";
import FileSeed from "./core/seed/file.seed";
// import TaskListSeed from "./core/seed/tasklist.seed";
// import AchievementSeed from "./core/seed/achievement.seed";
import UserAchievementSeed from "./core/seed/user-achievement.seed";
import tasklistSeed from "./core/seed/tasklist.seed";
import userTasklistSeed from "./core/seed/user-tasklist.seed";
import newsSeed from "./core/seed/news.seed";
import eventSeed from "./core/seed/event.seed";
import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const prisma = new PrismaClient();

/**
 * Load environment variables from .env file
 */
config();

// connect to s3 bucket and remove all
const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.AWS_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const emptyBucket = async () => {
  const files = await S3.send(
    new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
    })
  );

  if (!files?.Contents) return;

  files?.Contents.forEach(async (file) => {
    await S3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.Key,
      })
    );
  });
};

async function main() {
  await emptyBucket();

  const skills = await SkillSeed();
  const users = await UserSeed(S3);
  const societies = await SocietiesSeed();
  const news = await newsSeed();
  const event = await eventSeed();
  // const achievements = await AchievementSeed();
  const files = await FileSeed(S3);

  const usersAchievements = await UserAchievementSeed(users);
  const schools = await SchoolSeed(users);
  const usersPreferences = await UserPreferenceSeed(users);

  const missions = await MissionSeed(users, societies);
  const usersSkills = await UserSkillSeed(users, skills);

  const taskList = await tasklistSeed(skills);
  const usersTaskList = await userTasklistSeed(users, taskList);
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
