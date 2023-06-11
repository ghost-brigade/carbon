import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (): Promise<any[]> => {
  const eventData = [
    {
      name: "🎤 Nouvelle Conference",
      type: "Conference",
      date: "03/24",
      tag: "Javascript",
      src: "1.jpg",
      content: "Conference JS le 03/24",
    },
    {
      name: "🎓 Certification",
      type: "Competition",
      date: "03/24",
      tag: "Javascript",
      src: "8.jpeg",
      content: "Nouvelle certification",
    },
    {
      name: "🎤 Conference",
      type: "Soiree",
      date: "03/24",
      tag: "Javascript",
      src: "3.jpg",
      content: "Nouvelle Conference Frontend",
    },
    {
      name: "🥇 Compétition",
      type: "Competiton",
      date: "03/24",
      tag: "Javascript",
      src: "4.jpg",
      content: "Hackathon",
    },
    {
      name: "📖 Cours",
      type: "Conference",
      date: "03/24",
      tag: "Formation",
      src: "6.jpg",
      content: "Apprenez NestJS",
    },
    {
      name: "🥳 Soirée",
      type: "Soiree",
      date: "03/24",
      tag: "Javascript",
      src: "9.jpeg",
      content: "Soirée gala Carbon",
    },
  ];

  const allEvent = [];

  for (let i = 0; i < eventData.length; i++) {
    const event = await prisma.event.create({
      data: {
        name: eventData[i].name,
        type: eventData[i].type,
        date: eventData[i].date,
        tag: eventData[i].tag,
        src: eventData[i].src,
        content: eventData[i].content,
      },
    });

    allEvent.push(event);
  }

  return allEvent;
};
