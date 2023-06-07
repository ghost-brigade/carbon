import { Module } from "@nestjs/common";
import { UserService } from "./mission.service.";
import { UserController } from "./mission.controller";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
