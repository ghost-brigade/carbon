import { Controller, Get, HttpCode, UseInterceptors } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UserType } from "@carbon/zod";
import { UserPasswordInterceptor } from "../core/interceptors/user-password.interceptor";
import { UserSalaryInterceptor } from "../core/interceptors/user-salary.interceptor";
import { UserAvatarInterceptor } from "../core/interceptors/user-avatar.interceptor";

@Controller("leaderboard")
export class LeaderboardController {
  constructor(private readonly userService: UserService) {}

  @Get("experience")
  @UseInterceptors(
    UserAvatarInterceptor,
    new UserPasswordInterceptor(),
    new UserSalaryInterceptor()
  )
  @HttpCode(200)
  async experience(): Promise<UserType[]> {
    return await this.userService.findAll({
      include: {
        avatar: true,
      },
      limit: 50,
      order: {
        experience: "desc",
      },
    });
  }

  @Get("seniority")
  @UseInterceptors(
    UserAvatarInterceptor,
    new UserPasswordInterceptor(),
    new UserSalaryInterceptor()
  )
  @HttpCode(200)
  async seniority(): Promise<UserType[]> {
    return await this.userService.findAll({
      include: {
        avatar: true,
      },
      limit: 50,
      order: {
        entryDate: "asc",
      },
    });
  }

  @Get("mission")
  @UseInterceptors(
    UserAvatarInterceptor,
    new UserPasswordInterceptor(),
    new UserSalaryInterceptor()
  )
  @HttpCode(200)
  async mission(): Promise<UserType[]> {
    return await this.userService.findAll({
      include: {
        avatar: true,
      },
      limit: 50,
      order: {
        mission: "desc",
      },
    });
  }
}
