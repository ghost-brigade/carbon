import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [SkillController],
  providers: [SkillService, PrismaService]
})
export class SkillModule {}
