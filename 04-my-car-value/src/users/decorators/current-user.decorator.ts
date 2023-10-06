import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorators cant access dependency injection, hence cannot access UsersService to
 * create requests to the db.
 */
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
