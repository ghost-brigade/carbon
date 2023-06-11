import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { NewsCreateType, NewsType, NewsUpdateType } from "@carbon/zod";

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNews: NewsCreateType): Promise<NewsType> {
    try {
      return this.prisma.news.create({
        data: {
          title: createNews.title,
          src: createNews.src,
          content: createNews.content,
          size: createNews.size,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while creating news");
    }
  }

  async findAll(): Promise<NewsType[]> {
    try {
      return await this.prisma.news.findMany();
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching news");
    }
  }

  async findOne(id: string): Promise<NewsType> {
    try {
      return await this.prisma.news.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching news");
    }
  }

  async update(id: string, updateNews: NewsUpdateType): Promise<NewsType> {
    try {
      return (await this.prisma.news.update({
        where: { id },
        data: updateNews,
      })) as NewsType;
    } catch (error) {
      throw new InternalServerErrorException("Error while updating news");
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.news.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException("Error while deleting news");
    }
  }
}
