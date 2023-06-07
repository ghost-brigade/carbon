import { compare, genSalt, hash } from "bcryptjs";
import { MissionType, MissionCreateType, MissionUpdateType } from "@carbon/zod";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class MissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMission: MissionCreateType): Promise<MissionType> {
    try {
      const newMission = await this.prisma.mission.create({
        data: {
          name: createMission.name,
          description: createMission.description,
          dateStart: new Date(),
          dateEnd: null,
          rating: 0,
          feedback: null,
          societyId: createMission.societyId,
          userId: createMission.userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return newMission;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<MissionType[]> {
    try {
      const missions = await this.prisma.mission.findMany();
      return missions;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<MissionType | null> {
    try {
      const mission = await this.prisma.mission.findUnique({
        where: { id },
      });
      return mission;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateMission: MissionUpdateType): Promise<MissionType | null> {
    try {
      const updatedMission = await this.prisma.mission.update({
        where: { id },
        data: {
          name: updateMission.name,
          description: updateMission.description,
          societyId: updateMission.societyId,
          userId: updateMission.userId,
          updatedAt: new Date(),
        },
      });
      return updatedMission;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string): Promise<MissionType | null> {
    try {
      const deletedMission = await this.prisma.mission.delete({
        where: { id },
      });
      return deletedMission;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
