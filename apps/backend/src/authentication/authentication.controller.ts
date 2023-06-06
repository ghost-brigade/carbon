import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { Public } from "../core/decorators/public.decorator";
import { LoginSchema, LoginType } from "@carbon/zod";
import { ZodGuard } from "../core/guard/zod/zod.guard";
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(new ZodGuard("body", LoginSchema))
  @Post("login")
  @Public()
  login(@Body() login: LoginType) {
    return this.authenticationService.login(login);
  }
}
