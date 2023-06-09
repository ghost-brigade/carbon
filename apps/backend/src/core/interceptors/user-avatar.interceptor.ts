import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from "@nestjs/common";
import { map } from "rxjs/operators";
import { FileService } from "../../file/file.service";
import { UserType } from "@carbon/zod";
import { FileType } from "@prisma/client";

@Injectable()
export class UserAvatarInterceptor implements NestInterceptor {
  constructor(private readonly fileService: FileService) {}

  intercept(_context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(map(async (value) => await this.formatAvatar(value)));
  }

  private async formatAvatar(
    user: UserType | UserType[]
  ): Promise<UserType | UserType[]> {
    try {
      if (Array.isArray(user)) {
        return await Promise.all(
          user.map(async (u) => {
            if (u.avatar) {
              u.avatar = await this.getSignedAvatarUrl(u.avatar);
            }
    if (Array.isArray(user)) {
      return await Promise.all(
        user.map(async (u) => {
          if (u.avatar) {
            if (typeof u.avatar === "string") {
              throw new Error("Avatar is not an object");
            }

            u.avatar = await this.getSignedAvatarUrl({
              id: u.avatar.id,
              path: u.avatar.path,
            });
          }

            return u;
          })
        );
      }

      if (user.avatar) {
        user.avatar = await this.getSignedAvatarUrl(user.avatar);
      }
    if (user.avatar) {
      if (typeof user.avatar === "string") {
        throw new Error("Avatar is not an object");
      }

      user.avatar = await this.getSignedAvatarUrl({
        id: user.avatar.id,
        path: user.avatar.path,
      });
    }

      return user;
    } catch (error) {}
  }

  private async getSignedAvatarUrl(avatar: {
    id: string;
    path: string;
  }): Promise<string> {
    return await this.fileService.getSignedUrl({
      id: avatar.id,
      filename: avatar.path,
    });
  }
}
