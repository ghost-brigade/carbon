import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthenticationService } from "../../../authentication/authentication.service";
import { IS_PUBLIC_ROUTE_KEY } from "../../constants/guard.constant";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (isPublicRoute) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token not found");
    }

    try {
      const payload = await this.authenticationService.jwtLogin(token);
      request["_token"] = this.authenticationService.decodeToken(token);
      request["_user"] = payload;
    } catch {
      throw new UnauthorizedException("Token is invalid");
    }

    return true;
  }

  private extractTokenFromHeader(request: any) {
    if (!request.headers.authorization) {
      return null;
    }
    const token = request.headers.authorization.replace("Bearer ", "");
    return token;
  }
}
