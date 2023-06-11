import {
  MissionType,
  MissionCreateType,
  MissionUpdateType,
  MissionParamsType,
} from "@carbon/zod";
import { SocietyService } from "../society/society.service";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Mission } from "@prisma/client";
import hasRight from "../core/utils/hasRight";
import { RolesValues } from "@carbon/enum";

@Injectable()
export class MissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly society: SocietyService
  ) {}

  /**
   * Create a mission with role HR or COMMERCIAL
   * @param createMission
   * @returns
   */
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
      })) as MissionType;
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

  /**
   * Update a mission with role HR | COMMERCIAL and with role CONSULTANT
   * @param id
   * @param updateMission
   * @param user
   * @returns
   */
  async update(
    id: string,
    updateMission: MissionUpdateType,
    user
  ): Promise<MissionType | null> {
    try {
      // Update by HR or COMMERCIAL
      if (hasRight(user, [RolesValues.HR, RolesValues.COMMERCIAL]) === false) {
        const averageDailyRate = updateMission.averageDailyRate;

        if (typeof averageDailyRate === "string") {
          throw new BadRequestException("Invalid averageDailyRate");
        }

        const updatedMission = await this.prisma.mission.update({
          where: { id },
          data: {
            name: updateMission.name,
            description: updateMission.description,
            societyId: updateMission.societyId,
            userId: updateMission.userId,
            dateStart: new Date(updateMission.dateStart),
            dateEnd: new Date(updateMission.dateEnd),
            rating: updateMission.rating,
            feedback: updateMission.feedback,
            averageDailyRate: [JSON.stringify(averageDailyRate)],
          },
        });

        return updatedMission as any;
      } else {
        // Update by CONSULTANT
        const updatedMission = await this.prisma.mission.update({
          where: { id },
          data: {
            societyId: updateMission.societyId,
            userId: updateMission.userId,
            rating: updateMission.rating,
            feedback: updateMission.feedback,
          },
        });
        return updatedMission as any;
      }
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
