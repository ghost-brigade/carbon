import { Module } from '@nestjs/common';
import { SocietyService } from './society.service';
import { SocietyController } from './society.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [SocietyController],
  providers: [SocietyService, PrismaService]
})
export class SocietyModule {}
