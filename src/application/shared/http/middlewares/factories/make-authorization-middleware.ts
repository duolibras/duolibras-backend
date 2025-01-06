
import { Roles } from '@/application/modules/auth/entities/account';
import { AuthorizationMiddleware, IOptions } from '../authorization-middleware';

export function makeAuthorizationMiddleware(requiredRoles: Roles[], options?: IOptions) {
  return new AuthorizationMiddleware(
    requiredRoles,
    options,
  );
}
