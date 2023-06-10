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
  Query,
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
  UserTaskListCreateType,
  UserPreferenceCreateSchema,
  UserUpdateSchema,
} from "@carbon/zod";
import { ZodGuard } from "../core/guard/zod/zod.guard";
import { UserPasswordInterceptor } from "../core/interceptors/user-password.interceptor";
import { UserContext } from "../core/decorators/user-context.decorator";
import { UserSalaryInterceptor } from "../core/interceptors/user-salary.interceptor";
import { UserAvatarInterceptor } from "../core/interceptors/user-avatar.interceptor";
import getOrder from "../core/utils/getOrder";
import { AuthorizationGuard } from "../core/guard/authorization.guard";
import { RolesValues } from "@carbon/enum";

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
  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
  async create(@Body() createUser: UserCreateType): Promise<UserType> {
    return await this.userService.create(createUser);
  }

  @Get()
  @UseInterceptors(
    UserAvatarInterceptor,
    new UserPasswordInterceptor(),
    new UserSalaryInterceptor()
  )
  @HttpCode(200)
  async findAll(@Query() params: UserParamsType): Promise<UserType[]> {
    const { orderBy } = params;
    const order = orderBy && getOrder(orderBy);

    return await this.userService.findAll({
      params,
      order,
      include: {
        skills: {
          include: {
            skill: {
              select: {
                name: true,
              },
            },
          },
        },
        avatar: true,
        taskLists: true,
        missions: true,
        UserPreference: true,
        School: true,
        UserAchievement: true,
      },
    });
  }

  @Get(":id")
  @UseInterceptors(
    UserAvatarInterceptor,
    new UserPasswordInterceptor(),
    new UserSalaryInterceptor()
  )
  @HttpCode(200)
  async findOne(@Param("id") id: string): Promise<UserType> {
    return await this.userService.findOne(id);
  }

  @Put(":id")
  @UseInterceptors(
    UserAvatarInterceptor,
    new UserPasswordInterceptor(),
    new UserSalaryInterceptor()
  )
  @HttpCode(200)
  @UseGuards(new ZodGuard("body", UserUpdateSchema))
  async update(
    @Param("id") id: string,
    @Body() updateUser: UserUpdateType,
    @UserContext() user: UserType
  ): Promise<UserType> {
    return await this.userService.update(id, updateUser, user);
  }

  @Delete(":id")
  @HttpCode(204)
  @UseGuards(new AuthorizationGuard([RolesValues.COMMERCIAL, RolesValues.HR]))
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

  @UseGuards(new ZodGuard("body", UserPreferenceCreateSchema))
  @Post("preference")
  async addPreference(
    @UserContext() user: UserType,
    // @Param("id") id: string,
    @Body() createPreference: UserPreferenceCreateType
  ): Promise<UserType> {
    return await this.userService.addPreferenceToUser(
      user.id,
      createPreference
    );
  }

  @Delete("preference/:preferenceId")
  async removePreference(
    @UserContext() user: UserType,
    @Param("preferenceId") preferenceId: string
  ): Promise<UserType> {
    return await this.userService.removePreferenceFromUser(
      user.id,
      preferenceId
    );
  }

  // @Post(":id/achievement")
  // async addAchievement(
  //   @Param("id") id: string,
  //   @Body() createAchievement: UserAchievementCreateType
  // ): Promise<UserType> {
  //   return await this.userService.addAchievementToUser(id, createAchievement);
  // }

  @Post(":id/tasklist")
  async addTaskList(
    @Param("id") id: string,
    @Body() createTaskList: UserTaskListCreateType
  ): Promise<UserType> {
    return await this.userService.addTaskListToUser(id, createTaskList);
  }

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
