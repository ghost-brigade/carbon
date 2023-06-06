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
  UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { PrismaService } from "../prisma.service";
import { JWT_SECRET } from "../core/constants/jwt.constant";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(payload: LoginType): Promise<LoginResponseType> {
    if (!payload.email || !payload.password) {
      new UnprocessableEntityException("Email and password are required");
    }

    try {
      const user: UserType = {}; // TODO recover user from user service

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

  async jwtLogin(access_token: string): Promise<JwtResponseType> {
    try {
      await this.jwtService.verifyAsync(access_token, {
        secret: JWT_SECRET,
      });

      const user: UserType = {}; // TODO recover user from user service
      return user;
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
}
