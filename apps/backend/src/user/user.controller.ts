import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { UserService } from "./user.service";
import {
  UserCreateSchema,
  UserCreateType,
  UserType,
  UserUpdateType,
} from "@carbon/zod";
import { ZodGuard } from "../core/guard/zod/zod.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(new ZodGuard("body", UserCreateSchema))
  @Post()
  @HttpCode(201)
  async create(@Body() createUser: UserCreateType): Promise<UserType> {
    return await this.userService.create(createUser);
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(":id")
  @HttpCode(200)
  async findOne(@Param("id") id: string) {
    return await this.userService.findOne(id);
  }

  @Put(":id")
  @HttpCode(200)
  async update(@Param("id") id: string, @Body() updateUser: UserUpdateType) {
    return await this.userService.update(id, updateUser);
  }

  @Delete(":id")
  @HttpCode(204)
  async remove(@Param("id") id: string) {
    return await this.userService.remove(id);
  }
}
