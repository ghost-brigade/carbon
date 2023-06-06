import { Injectable } from "@nestjs/common";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { PrismaService } from "../prisma.service";
import { Skill, Prisma } from "@prisma/client";

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SkillCreateInput): Promise<Skill> {
    return this.prisma.skill.create({
      data,
    });
  }

  findAll() {
    return `This action returns all skills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skill`;
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return `This action updates a #${id} skill`;
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
