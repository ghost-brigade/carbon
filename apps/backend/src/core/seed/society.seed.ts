import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (): Promise<any[]> => {
  const societies = [];

  const societesDataset = [
    "Carbon IT",
    "PMU",
    "Carrefour",
    "Canal+",
    "SeLoger",
    "Fnac Darty",
    "Edenred",
    "Societe Generale",
    "BNP PARIBAS",
    "Veepee",
  ];

  for (const society of societesDataset) {
    const newSociety = await prisma.society.create({
      data: {
        name: society,
      },
    });
    societies.push(newSociety);
  }

  return societies;
};
