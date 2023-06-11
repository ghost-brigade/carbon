import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Event, Prisma } from "@prisma/client";
import { EventType, EventParamsType } from "@carbon/zod";

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: EventParamsType): Promise<EventType[]> {
    try {
      const query = {};
      if (params.type) query["type"] = params.type;
      const event = await this.prisma.event.findMany({
        where: query,
      });
      return event;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error while fetching events");
    }
  }
}
