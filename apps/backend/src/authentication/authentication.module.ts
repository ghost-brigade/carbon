import { LocalStrategy } from "./strategies/local.strategies";
import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../core/constants/jwt.constant";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategies";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
