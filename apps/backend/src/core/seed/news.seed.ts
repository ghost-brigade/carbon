import { faker } from "@faker-js/faker/locale/fr";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (): Promise<any[]> => {
  const newsData = [
    {
      title: "🎤 Nouvelle conference",
      src: "1.jpg",
      content: "Conference JS le 03/24",
      size: "lg:col-span-2",
    },
    {
      title: "🎓 Certification",
      src: "8.jpeg",
      content: "Nouvelle certification",
      size: "lg:col-span-1",
    },
    {
      title: "🎤 Conférence",
      src: "3.jpg",
      content: "Nouvelle conférence Frontend",
      size: "lg:col-span-1",
    },
    {
      title: "🥇 Compétition",
      src: "4.jpg",
      content: "Hackathon",
      size: "lg:col-span-1",
    },
    {
      title: "🥇 Leaderboard",
      src: "2.jpg",
      content: "Alexis Lours, toujours au top",
      size: "col-span-1",
    },
    {
      title: "📖 Cours",
      tag: "Formation",
      src: "6.jpg",
      content: "Apprenez NestJS",
      size: "lg:col-span-2",
    },
    {
      title: "🤝 Rdv",
      tag: "RH",
      src: "7.jpg",
      content: "RDV RH le 12/11",
      size: "lg:col-span-2",
    },
    {
      title: "🥳 Soirée",
      src: "9.jpeg",
      content: "Soirée gala Carbon",
      size: "lg:col-span-1",
    },
    {
      title: "Bonnes pratiques",
      src: "5.jpg",
      content: "Nos conseils",
      size: "lg:col-span-1",
    },
    {
      title: "🌿 Conseils",
      src: "10.jpeg",
      content: "Comment bien dormir ?",
      size: "lg:col-span-2",
    },
    {
      title: "🚨 Sécurité",
      src: "11.jpeg",
      content: "Log4j, le fléau",
      size: "lg:col-span-2",
    },
  ];

  const allNews = [];

  for (let i = 0; i < newsData.length; i++) {
    const news = await prisma.news.create({
      data: {
        title: newsData[i].title,
        src: newsData[i].src,
        content: newsData[i].content,
        size: newsData[i].size,
      },
    });

    allNews.push(news);
  }

  return allNews;
};
