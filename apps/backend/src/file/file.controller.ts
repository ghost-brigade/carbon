import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Param,
  Get,
  Put,
  Delete,
} from "@nestjs/common";
import { ZodGuard } from "../core/guard/zod/zod.guard";
import { FileInterceptor } from "@nestjs/platform-express";
// Due to a bug we need to import Multer without using it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from "multer";
import { FileService } from "./file.service";
import { FileCreateType } from "libs/zod/src/lib/schemas/file/file.zod";
import { Public } from "../core/decorators/public.decorator";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        /**
         * 10 MB file size limit
         */
        fileSize: 1024 * 1024 * 50,
      },
      fileFilter: (req, file, cb) => {
        if (
          !file.originalname.match(
            /\.(jpg|jpeg|png|gif|webp|pdf|docx|xlsx|xls|csv|txt|mp3|mp4|mov|avi|zip|rar|tar|gz|json|pptx|ppt|odt|odp|ods)$/
          )
        ) {
          return cb(
            new BadRequestException("File type is not supported"),
            false
          );
        }
        cb(null, true);
      },
    })
  )
  @Post()
  @HttpCode(201)
  @Public()
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileCreate: FileCreateType
  ) {
    return await this.fileService.create(file, fileCreate);
  }

  @Get()
  @HttpCode(200)
  @Public()
  async findAll() {
    return await this.fileService.findAll();
  }

  @Get(":id")
  @HttpCode(200)
  @Public()
  async findOne(@Param("id") id: string) {
    return await this.fileService.findOne(id);
  }

  @Delete(":id")
  @HttpCode(204)
  @Public()
  async remove(@Param("id") id: string) {
    return await this.fileService.remove(id);
  }
}
