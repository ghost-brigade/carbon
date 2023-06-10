import { UserType } from "@carbon/zod";
import { faker } from "@faker-js/faker/locale/fr";
import { RolesValues } from "../../../../../libs/enum/src/role.enum";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default async (S3: S3Client): Promise<UserType[]> => {
  const usersDataset = [
    {
      email: "julien@esgi.fr",
      firstName: "Julien",
      lastName: "Arbellinitoci",
      avatar: "./avatar/Julien.jpg",
      role: RolesValues.USER,
    },
    {
      email: "louis@esgi.fr",
      firstName: "Louis",
      lastName: "Mouline",
      avatar: "./avatar/Louis.jpg",
      role: RolesValues.USER,
    },
    {
      email: "anthony@esgi.fr",
      firstName: "Anthony",
      lastName: "Arjojo",
      avatar: "./avatar/Anthony.jpg",
      role: RolesValues.USER,
    },
    {
      email: "alexis@esgi.fr",
      firstName: "Alexis",
      lastName: "Loursbrun",
      avatar: "./avatar/Alexis.jpg",
      role: RolesValues.USER,
    },
    {
      email: "stanley@esgi.fr",
      firstName: "Stanley",
      lastName: "Cricoco",
      avatar: "./avatar/Stanley.jpg",
      role: RolesValues.USER,
    },
    {
      email: "ludo@esgi.fr",
      firstName: "Loudovic",
      lastName: "Regex Harrison",
      avatar: "./avatar/Loudovic.jpg",
      role: RolesValues.USER,
    },
    {
      email: "solene@carbon-it.fr",
      firstName: "Solène",
      lastName: "Ancel",
      avatar: "./avatar/Solene.jpg",
      role: RolesValues.HR,
    },
    {
      email: "christophe@carbon-it.fr",
      firstName: "Christophe",
      lastName: "Arrestier",
      avatar: "./avatar/Christophe.jpg",
      role: RolesValues.COMMERCIAL,
    },
  ];
  const users: UserType[] = [];

  for (const user of usersDataset) {
    const avatarDb = await prisma.file.create({
      data: {
        name: `${user.firstName} ${user.lastName}`,
        description: "Avatar",
        path: user.avatar.split("/")[2],
        type: "avatar",
      },
    });

    await S3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${avatarDb.id}/${user.avatar.split("/")[2]}`,
        Body: Buffer.from(
          fs.readFileSync(path.join(__dirname, user.avatar)).toString("base64"),
          "base64"
        ),
      })
    );

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
        avatar: {
          connect: {
            id: avatarDb.id,
          },
        },
        role: user.role,
        entryDate: faker.date.past(),
        experience: faker.number.int({ min: 0, max: 100000 }),
      },
    });

    users.push(newUser as UserType);
  }

  return users;
};
