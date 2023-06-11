import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import {
  NewsCreateSchema,
  NewsCreateType,
  NewsSchema,
  NewsUpdateSchema,
  NewsUpdateType,
} from "@carbon/zod";
import { Public } from "../core/decorators/public.decorator";
import { ZodGuard } from "../core/guard/zod/zod.guard";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(new ZodGuard("body", NewsCreateSchema))
  @Public()
  @Post()
  async create(@Body() createNews: NewsCreateType) {
    return this.newsService.create(createNews);
  }

  @Public()
  @Get()
  async findAll() {
    return this.newsService.findAll();
  }

  @Public()
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.newsService.findOne(id);
  }

  @UseGuards(new ZodGuard("body", NewsUpdateSchema))
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateNews: NewsUpdateType) {
    return await this.newsService.update(id, updateNews);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.newsService.remove(id);
  }
}
