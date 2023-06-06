import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { Public } from "../core/decorators/public.decorator";
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("login")
  @Public()
  login(@Body() login: any) {
    return this.authenticationService.login(login);
  }
}
