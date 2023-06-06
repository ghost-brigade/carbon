import {
  UserType,
  JwtResponseType,
  LoginResponseType,
  LoginType,
} from "@carbon/zod";
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { JWT_SECRET } from "../core/constants/jwt.constant";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async login(payload: LoginType): Promise<LoginResponseType> {
    if (!payload.email || !payload.password) {
      new UnprocessableEntityException("Email and password are required");
    }

    try {
      const user: UserType = await this.userService.findUserByEmail(
        payload.email
      );

      if (!user) {
        new UnauthorizedException("Email or password is incorrect");
      }

      const isPasswordValid = await this.comparePassword(
        payload.password,
        user.password
      );

      if (isPasswordValid === false) {
        new UnauthorizedException("Email or password is incorrect");
      }

      return {
        access_token: await this.jwtService.signAsync({
          email: user.email,
          sub: user.id,
        }),
      };
    } catch (error) {
      new UnauthorizedException("Email or password is incorrect");
    }
  }

  async jwtLogin(access_token: string): Promise<UserType> {
    try {
      const data: JwtResponseType = await this.jwtService.verifyAsync(
        access_token,
        {
          secret: JWT_SECRET,
        }
      );

      return await this.userService.findUserByEmail(data.email);
    } catch {
      new UnauthorizedException("Token is invalid or expired");
    }
  }

  async comparePassword(
    plainPassword: string,
    password: string
  ): Promise<boolean> {
    return await compare(plainPassword, password);
  }

  async validateUser({
    email,
    plainPassword,
  }: {
    email: string;
    plainPassword: string;
  }): Promise<UserType | null> {
    const user = await this.userService.findUserByEmail(email);

    if (
      user &&
      (await this.userService.comparePassword({
        password: user.password,
        plainPassword,
      }))
    ) {
      return user;
    }

    return null;
  }
}
