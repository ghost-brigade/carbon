import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { PrismaService } from "../prisma.service";
import { UserService } from "../user/user.service";

@Module({
  controllers: [FileController],
  providers: [PrismaService, FileService, UserService],
  exports: [FileService],
})
export class FileModule {}
