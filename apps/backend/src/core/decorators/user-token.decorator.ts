import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const TokenContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request._token;
  }
);
