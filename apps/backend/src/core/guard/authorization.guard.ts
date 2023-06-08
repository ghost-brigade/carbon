import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Roles, RolesValues } from "@carbon/enum";
import { UserType } from "@carbon/zod";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private role: Roles[]) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const currentUser = request._user as UserType;

    if (this.role.includes(currentUser.role)) {
      return true;
    }

    throw new UnauthorizedException(
      `Your role ${currentUser.role} is not authorized to access this resource`
    );
  }
}
