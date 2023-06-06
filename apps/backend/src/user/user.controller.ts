import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserCreateType, UserUpdateType } from "@carbon/zod";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUser: UserCreateType) {
    return await this.userService.create(createUser);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.userService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateUser: UserUpdateType) {
    return await this.userService.update(id, updateUser);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.userService.remove(id);
  }
}
