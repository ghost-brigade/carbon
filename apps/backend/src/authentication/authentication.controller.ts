import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { Public } from "../core/decorators/public.decorator";
import { JwtResponseType, LoginSchema, LoginType } from "@carbon/zod";
import { ZodGuard } from "../core/guard/zod/zod.guard";
import { TokenContext } from "../core/decorators/user-token.decorator";
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(new ZodGuard("body", LoginSchema))
  @Post("login")
  @Public()
  login(@Body() login: LoginType) {
    return this.authenticationService.login(login);
  }

  @Get("logout")
  @HttpCode(204)
  logout(@TokenContext() token: JwtResponseType) {
    return this.authenticationService.logout(token.token);
  }
}
