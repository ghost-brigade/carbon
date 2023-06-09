import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from "@nestjs/common";
import { map } from "rxjs/operators";
import { FileService } from "../../file/file.service";
import { UserType } from "@carbon/zod";

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
    if (Array.isArray(user)) {
      return await Promise.all(
        user.map(async (u) => {
          if (u.avatar) {
            u.avatar = await this.getSignedAvatarUrl(u.avatar);
          }

          return u;
        })
      );
    }

    if (user.avatar) {
      user.avatar = await this.getSignedAvatarUrl(user.avatar);
    }

    return user;
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
