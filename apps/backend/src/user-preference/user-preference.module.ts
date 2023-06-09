import { Module } from "@nestjs/common";
import { UserPreferenceService } from "./user-preference.service";
import { UserPreferenceController } from "./user-preference.controller";
import { PrismaService } from "../prisma.service";

@Module({
  imports: [],
  controllers: [UserPreferenceController],
  providers: [UserPreferenceService, PrismaService],
})
export class UserPreferenceModule {}
