import {
  UserType,
  JwtResponseType,
  LoginResponseType,
  LoginType,
  LoginResponseSchema,
  UserTokenType,
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
import { UserTokenService } from "./user-token.service";
@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userTokenService: UserTokenService
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
          token: await this.userTokenService.createToken({ userId: user.id }),
          sub: user.id,
        }),
      };
    } catch (error) {
      new UnauthorizedException("Email or password is incorrect");
    }
  }

  async jwtLogin(access_token: string): Promise<UserType> {
    try {
      if (!access_token) {
        throw new Error();
      }

      const data: JwtResponseType = await this.jwtService.verifyAsync(
        access_token,
        {
          secret: JWT_SECRET,
        }
      );

      console.log(data);

      if ((await this.userTokenService.validateToken(data.token)) === false) {
        throw new Error();
      }

      return await this.userService.findUserByEmail(data.email);
    } catch {
      throw new UnauthorizedException("Token is invalid or expired");
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
