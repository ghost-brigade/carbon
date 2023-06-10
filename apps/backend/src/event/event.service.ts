import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Event, Prisma } from "@prisma/client";
import { EventType } from "@carbon/zod";

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<EventType[]> {
    try {
      return await this.prisma.event.findMany();
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching event");
    }
  }
}
