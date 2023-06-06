import { LocalStrategy } from "./strategies/local.strategies";
import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../core/constants/jwt.constant";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategies";
import { UserService } from "../user/user.service";

@Module({
  imports: [
    PrismaService,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
