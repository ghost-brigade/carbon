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
export class AverageDailyRatingInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    const request = _context.switchToHttp().getRequest();

    if (
      request._user.role === RolesValues.HR ||
      request._user.role === RolesValues.COMMERCIAL
    ) {
      return next.handle();
    }

    return next.handle().pipe(map((value) => this.removeADR(value)));
  }

  private removeADR(object) {
    if (Array.isArray(object)) {
      return object.map((obj) => this.removeADR(obj));
    }

    if (typeof object === "object" && object !== null) {
      for (const key in object) {
        if (key === "averageDailyRate") {
          delete object[key];
        } else {
          object[key] = this.removeADR(object[key]);
        }
      }
    }

    return object;
  }
}
