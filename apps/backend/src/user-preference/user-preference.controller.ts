import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { UserPreferenceService } from "./user-preference.service";
// import { UserPreferenceCreateSchema, UserPreferenceCreateType, UserPreferenceUpdateSchema, UserPreferenceUpdateType } from "@carbon/zod";
import { Public } from "../core/decorators/public.decorator";
import { ZodGuard } from "../core/guard/zod/zod.guard";

@Controller("user-preference")
export class UserPreferenceController {
  constructor(private readonly userPreferenceService: UserPreferenceService) {}

  @Get("search")
  async search(@Query("description") description: string) {
    return this.userPreferenceService.search(description);
  }
}
