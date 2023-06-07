import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { School, Prisma } from "@prisma/client";
import { SchoolCreateType, SchoolType, SchoolUpdateType } from "@carbon/zod";

@Injectable()
export class SchoolService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSchool: SchoolCreateType): Promise<School> {
    try {
      return this.prisma.school.create({
        data: {
          name: createSchool.name,
          description: createSchool.description,
          dateStart: createSchool.dateStart,
          dateEnd: createSchool.dateEnd,
          userId: createSchool.userId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while creating school");
    }
  }

  async findAll(): Promise<SchoolType[]> {
    try {
      return await this.prisma.school.findMany();
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching schools");
    }
  }

  async findOne(id: string): Promise<SchoolType> {
    try {
      return await this.prisma.school.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching school");
    }
  }

  async update(id: string, updateSchool: SchoolUpdateType): Promise<SchoolType> {
    try {
      return (await this.prisma.school.update({
        where: { id },
        data: updateSchool,
      })) as SchoolType;
    } catch (error) {
      throw new InternalServerErrorException("Error while updating school");
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.school.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException("Error while deleting school");
    }
  }
}
