import { UserType } from "@carbon/zod";
import { PrismaClient } from "@prisma/client";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default async (S3: S3Client) => {
  const dataset = [
    {
      name: "Présentation de l'entreprise",
      description: "Présentation de l'entreprise",
      path: "./files/docs.txt",
      tags: ["Présentation", "Entreprise"],
    },
    {
      name: "Organigramme de l'entreprise",
      description: "Organigramme de l'entreprise",
      path: "./files/docs.txt",
      tags: ["Organigramme", "Entreprise"],
    },
    {
      name: "Règlement intérieur",
      description: "Règlement intérieur",
      path: "./files/docs.txt",
      tags: ["Règlement", "Entreprise"],
    },
    {
      name: "Charte informatique",
      description: "Charte informatique",
      path: "./files/docs.txt",
      tags: ["Charte", "Entreprise"],
    },
    {
      name: "Convention collective",
      description: "Convention collective",
      path: "./files/docs.txt",
      tags: ["Convention", "Entreprise"],
    },
  ];

  const files: UserType[] = [];

  for (const file of dataset) {
    const newFile = await prisma.file.create({
      data: {
        name: file.name,
        description: file.description,
        type: "resource",
        path: file.path.split("/")[2],
        tags: file.tags,
      },
    });

    await S3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${newFile.id}/${newFile.path.split("/").slice(2)}`,
        Body: Buffer.from(
          fs.readFileSync(path.join(__dirname, file.path)).toString("base64"),
          "base64"
        ),
      })
    );

    files.push(newFile);
  }

  return files;
};
