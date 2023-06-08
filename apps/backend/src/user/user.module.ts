import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
