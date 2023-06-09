import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { News, Prisma } from "@prisma/client";
import { NewsType } from "@carbon/zod";

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<NewsType[]> {
    try {
      return await this.prisma.news.findMany();
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching news");
    }
  }
}
