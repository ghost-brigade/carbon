import { UserType } from "@carbon/zod";
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from "@nestjs/common";
import { map } from "rxjs/operators";

@Injectable()
export class UserPasswordInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((value) => this.removePassword(value)));
  }

  private removePassword(user: UserType | UserType[]): UserType | UserType[] {
    if (Array.isArray(user)) {
      return user.map((u) => {
        delete u.password;
        return u;
      });
    }

    delete user.password;
    return user;
  }
}
