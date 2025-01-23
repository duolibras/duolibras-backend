
import { Roles } from '@/application/modules/auth/entities/account';
import { AuthorizationMiddleware } from '../authorization-middleware';

export function makeAuthorizationMiddleware(requiredRoles: Roles[]) {
  return new AuthorizationMiddleware(
    requiredRoles,
  );
}
