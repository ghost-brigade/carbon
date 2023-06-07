import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [FileController],
  providers: [PrismaService, FileService],
  exports: [FileService],
})
export class FileModule {}
