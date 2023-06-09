import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthenticationService } from "../../authentication/authentication.service";
import { UserType } from "@carbon/zod";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string): Promise<UserType> {
    const user = await this.authenticationService.validateUser({
      email,
      plainPassword: password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
