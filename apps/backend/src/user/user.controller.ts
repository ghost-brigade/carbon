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
  UserSkillCreateType,
  UserPreferenceCreateType,
  UserAchievementCreateType,
  UserTaskListCreateType,
  UserMissionCreateType,
  UserSchoolCreateType,
} from "@carbon/zod";
import { ZodGuard } from "../core/guard/zod/zod.guard";
import { UserPasswordInterceptor } from "../core/interceptors/user-password.interceptor";
import { UserContext } from "../core/decorators/user-context.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @UseInterceptors(new UserPasswordInterceptor())
  @HttpCode(200)
  async me(@UserContext() user: UserType): Promise<UserType> {
    return await this.userService.findUserByEmail(user.email);
  }

  @UseGuards(new ZodGuard("body", UserCreateSchema))
  @Post()
  @UseInterceptors(new UserPasswordInterceptor())
  @HttpCode(201)
  async create(@Body() createUser: UserCreateType): Promise<UserType> {
    return await this.userService.create(createUser);
  }

  @Get()
  @UseInterceptors(new UserPasswordInterceptor())
  @HttpCode(200)
  async findAll(@Param() params: UserParamsType): Promise<UserType[]> {
    return await this.userService.findAll();
  }

  @Get(":id")
  @UseInterceptors(new UserPasswordInterceptor())
  @HttpCode(200)
  async findOne(@Param("id") id: string): Promise<UserType> {
    return await this.userService.findOne(id);
  }

  @Put(":id")
  @UseInterceptors(new UserPasswordInterceptor())
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

  @Post(":id/skill")
  async addSkill(
    @Param("id") id: string,
    @Body() createSkill: UserSkillCreateType
  ): Promise<UserType> {
    return await this.userService.addSkillToUser(id, createSkill);
  }

  // @Post(":id/preference")
  // async addPreference(
  //   @Param("id") id: string,
  //   @Body() createPreference: UserPreferenceCreateType
  // ): Promise<UserType> {
  //   return await this.userService.addPreferenceToUser(id, createPreference);
  // }

  // @Post(":id/achievement")
  // async addAchievement(
  //   @Param("id") id: string,
  //   @Body() createAchievement: UserAchievementCreateType
  // ): Promise<UserType> {
  //   return await this.userService.addAchievementToUser(id, createAchievement);
  // }

  // @Post(":id/tasklist")
  // async addTaskList(
  //   @Param("id") id: string,
  //   @Body() createTaskList: UserTaskListCreateType
  // ): Promise<UserType> {
  //   return await this.userService.addTaskListToUser(id, createTaskList);
  // }

  // @Post(":id/mission")
  // async addMission(
  //   @Param("id") id: string,
  //   @Body() createMission: UserMissionCreateType
  // ): Promise<UserType> {
  //   return await this.userService.addMissionToUser(id, createMission);
  // }

  // @Post(":id/school")
  // async addSchool(
  //   @Param("id") id: string,
  //   @Body() createSchool: UserSchoolCreateType
  // ): Promise<UserType> {
  //   return await this.userService.addSchoolToUser(id, createSchool);
  // }
}
