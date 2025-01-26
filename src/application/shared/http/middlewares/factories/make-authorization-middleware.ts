
import { Roles } from '@/application/modules/account/entities/account';
import { AuthorizationMiddleware } from '../authorization-middleware';

export function makeAuthorizationMiddleware(requiredRoles: Roles[]) {
  return new AuthorizationMiddleware(
    requiredRoles,
  );
}
