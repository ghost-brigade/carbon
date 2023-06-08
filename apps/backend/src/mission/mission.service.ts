import {
  MissionType,
  MissionCreateType,
  MissionUpdateType,
  MissionParamsType,
} from "@carbon/zod";
import { SocietyService } from "../society/society.service";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Mission } from "@prisma/client";

@Injectable()
export class MissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly society: SocietyService
  ) {}

  async create(createMission: MissionCreateType): Promise<MissionType> {
    const society = await this.society.findOne(createMission.societyId);
    if (!society) {
      throw new NotFoundException("Society not found");
    }

    try {
      return (await this.prisma.mission.create({
        // @ts-ignore
        data: {
          ...createMission,
          dateStart: new Date(createMission.dateStart),
          dateEnd: new Date(createMission.dateEnd),
          societyId: createMission.societyId,
          userId: createMission.userId,
        },
      })) as any;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll({
    params,
  }: {
    params?: MissionParamsType;
  }): Promise<Mission[]> {
    try {
      const query = {};

      if (params.name) query["name"] = { startsWith: params.name };

      const missions = await this.prisma.mission.findMany({
        where: query,
      });

      return missions;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<MissionType | null> {
    try {
      const mission = await this.prisma.mission.findUnique({
        where: { id },
      });
      return mission as any;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(
    id: string,
    updateMission: MissionUpdateType
  ): Promise<MissionType | null> {
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
      return updatedMission as any;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const deletedMission = await this.prisma.mission.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
