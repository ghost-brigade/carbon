import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UserPreference, Prisma } from "@prisma/client";
// import { UserPreferenceType } from "@carbon/zod";

@Injectable()
export class UserPreferenceService {
  constructor(private readonly prisma: PrismaService) {}

  async search(description): Promise<any[]> {
    try {
      const userPreferences = await this.prisma.userPreference.findMany({
        where: {
          description: {
            startsWith: description,
            mode: "insensitive",
          },
        },
        distinct: ["description"],
        take: 10,
      });

      return userPreferences.map(({ description }) => ({ description }));
    } catch (error) {
      throw new InternalServerErrorException("Error while search");
    }
  }
}
