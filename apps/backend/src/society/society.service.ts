import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Society, Prisma } from "@prisma/client";
import { SocietyCreateType, SocietyType, SocietyUpdateType } from "@carbon/zod";

@Injectable()
export class SocietyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSociety: SocietyCreateType): Promise<Society> {
    try {
      return this.prisma.society.create({
        data: {
          name: createSociety.name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while creating society");
    }
  }

  async findAll(): Promise<SocietyType[]> {
    try {
      return await this.prisma.society.findMany();
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching societys");
    }
  }

  async findOne(id: string): Promise<SocietyType> {
    try {
      return await this.prisma.society.findUnique({
        where: { id },
      });
      console.log(id);

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error while fetching society");
    }
  }

  async update(id: string, updateSociety: SocietyUpdateType): Promise<SocietyType> {
    try {
      return (await this.prisma.society.update({
        where: { id },
        data: updateSociety,
      })) as SocietyType;
    } catch (error) {
      throw new InternalServerErrorException("Error while updating society");
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.society.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException("Error while deleting society");
    }
  }
}
