
import { Roles } from '@/application/modules/account/entities/account';
import { ForbiddenHTTPError } from '../errors/forbidden-http-error';
import { IHttpRequest, IHttpResponse } from '../interfaces/http';
import { IData, IMiddleware } from '../interfaces/middleware';

export interface IOptions {}

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredRoles: Roles[],
  ) {}

  async handle({ account }: IHttpRequest): Promise<IHttpResponse | IData> {
    if (!account) {
      throw new ForbiddenHTTPError('Access denied');
    }

    const isAllowed = this.requiredRoles.some(role => (
      account.role === role
    ));

    if (!isAllowed) {
      throw new ForbiddenHTTPError('Access denied');
    }

    return {
      data: {},
    };
  }
}
