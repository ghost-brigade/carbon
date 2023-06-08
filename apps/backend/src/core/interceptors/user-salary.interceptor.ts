import { RolesValues } from "@carbon/enum";
import { UserType } from "@carbon/zod";
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from "@nestjs/common";
import { map } from "rxjs/operators";

@Injectable()
export class UserSalaryInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    const request = _context.switchToHttp().getRequest();

    if (request._user.role === RolesValues.HR) {
      return next.handle();
    }

    return next.handle().pipe(map((value) => this.removeSalary(value)));
  }

  private removeSalary(user: UserType | UserType[]): UserType | UserType[] {
    if (Array.isArray(user)) {
      return user.map((u) => {
        delete u.salary;
        return u;
      });
    }

    delete user.salary;
    return user;
  }
}
