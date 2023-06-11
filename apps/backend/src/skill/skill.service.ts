import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Skill, Prisma } from "@prisma/client";
import { SkillCreateType, SkillType, SkillUpdateType } from "@carbon/zod";

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSkill: SkillCreateType): Promise<Skill> {
    try {
      return this.prisma.skill.create({
        data: {
          name: createSkill.name,
          language: createSkill.language,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while creating skill");
    }
  }

  async findAll(): Promise<SkillType[]> {
    try {
      return (await this.prisma.skill.findMany({
        include: {
          taskLists: true,
        },
        orderBy: {
          name: "asc",
        },
      })) as SkillType[];
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching skills");
    }
  }

  async findOne(id: string): Promise<SkillType> {
    try {
      return (await this.prisma.skill.findUnique({
        where: { id },
        include: {
          taskLists: true,
        },
      })) as SkillType;
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching skill");
    }
  }

  async update(id: string, updateSkill: SkillUpdateType): Promise<SkillType> {
    try {
      return (await this.prisma.skill.update({
        where: { id },
        data: updateSkill,
      })) as SkillType;
    } catch (error) {
      throw new InternalServerErrorException("Error while updating skill");
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.skill.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException("Error while deleting skill");
    }
  }
}
