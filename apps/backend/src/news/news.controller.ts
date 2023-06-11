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
import { AuthorizationGuard } from "../core/guard/authorization.guard";
import { RolesValues } from "@carbon/enum";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(new ZodGuard("body", NewsCreateSchema))
  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
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
  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateNews: NewsUpdateType) {
    return await this.newsService.update(id, updateNews);
  }

  @Delete(":id")
  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
  async remove(@Param("id") id: string) {
    return await this.newsService.remove(id);
  }
}
