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
      return next.handle().pipe(map((value) => this.formatSalary(value)));
    }

    return next.handle().pipe(map((value) => this.removeSalary(value)));
  }

  private formatSalary(user: UserType | UserType[]): UserType | UserType[] {
    const transform = (salary) => {
      if (Array.isArray(salary)) {
        return salary;
      }
      return [salary];
    };

    if (Array.isArray(user)) {
      return user.map((u) => {
        u.salary = transform(JSON.parse(u.salary));
        return u;
      });
    }

    user.salary = transform(JSON.parse(user.salary));
    return user;
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
