import { UserType } from "@carbon/zod";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import * as crypto from "crypto";
@Injectable()
export class UserTokenService {
  constructor(private readonly prisma: PrismaService) {}

  async createToken({ userId }: { userId: string }): Promise<string> {
    try {
      const userToken = await this.prisma.userToken.create({
        data: {
          userId,
          token: crypto.randomBytes(20).toString("hex"),
          status: true,
        },
      });

      return userToken.token;
    } catch (error) {
      new UnauthorizedException("Error while creating token");
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const userToken = await this.prisma.userToken.findUnique({
        where: {
          token,
        },
      });

      if (
        !userToken ||
        !userToken.status ||
        !userToken.userId ||
        userToken.createdAt < new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
      ) {
        return false;
      }

      return true;
    } catch {
      new UnauthorizedException("Error while validating token");
    }
  }

  async invalidateToken(token: string): Promise<boolean> {
    try {
      const userToken = await this.prisma.userToken.findUnique({
        where: {
          token,
        },
      });

      if (!userToken) {
        return false;
      }

      await this.prisma.userToken.update({
        where: {
          id: userToken.id,
        },
        data: {
          status: false,
        },
      });

      return true;
    } catch {
      new UnauthorizedException("Error while invalidating token");
    }
  }

  async invalidateAllTokens(userId: string): Promise<boolean> {
    try {
      const userTokens = await this.prisma.userToken.findMany({
        where: {
          userId,
        },
      });

      if (!userTokens) {
        return false;
      }

      await this.prisma.userToken.updateMany({
        where: {
          userId,
        },
        data: {
          status: false,
        },
      });

      return true;
    } catch {
      new UnauthorizedException("Error while invalidating token");
    }
  }
}
