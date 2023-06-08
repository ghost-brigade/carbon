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
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import {
  UserCreateSchema,
  UserCreateType,
  UserType,
  UserUpdateType,
  UserParamsType,
} from "@carbon/zod";
import { ZodGuard } from "../core/guard/zod/zod.guard";
import { UserPasswordInterceptor } from "../core/interceptors/user-password.interceptor";
import { UserContext } from "../core/decorators/user-context.decorator";
import { UserSalaryInterceptor } from "../core/interceptors/user-salary.interceptor";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @UseInterceptors(new UserPasswordInterceptor(), new UserSalaryInterceptor())
  @HttpCode(200)
  async me(@UserContext() user: UserType): Promise<UserType> {
    return await this.userService.findUserByEmail(user.email);
  }

  @UseGuards(new ZodGuard("body", UserCreateSchema))
  @Post()
  @UseInterceptors(new UserPasswordInterceptor(), new UserSalaryInterceptor())
  @HttpCode(201)
  async create(@Body() createUser: UserCreateType): Promise<UserType> {
    return await this.userService.create(createUser);
  }

  @Get()
  @UseInterceptors(new UserPasswordInterceptor(), new UserSalaryInterceptor())
  @HttpCode(200)
  async findAll(@Param() params: UserParamsType): Promise<UserType[]> {
    return await this.userService.findAll({
      include: {
        skills: {
          include: {
            skill: {
              select: {
                name: true,
              }
            },
          },
        },
        taskLists: true,
        missions: true,
        UserPreference: true,
        School: true,
        UserAchievement: true,
      },
    });
  }

  @Get(":id")
  @UseInterceptors(new UserPasswordInterceptor(), new UserSalaryInterceptor())
  @HttpCode(200)
  async findOne(@Param("id") id: string): Promise<UserType> {
    return await this.userService.findOne(id);
  }

  @Put(":id")
  @UseInterceptors(new UserPasswordInterceptor(), new UserSalaryInterceptor())
  @HttpCode(200)
  async update(
    @Param("id") id: string,
    @Body() updateUser: UserUpdateType
  ): Promise<UserType> {
    return await this.userService.update(id, updateUser);
  }

  @Delete(":id")
  @HttpCode(204)
  async remove(@Param("id") id: string): Promise<boolean> {
    return await this.userService.remove(id);
  }
}
