
import { Roles } from '@/application/modules/auth/entities/account';
import { IHttpRequest, IHttpResponse } from '../interfaces/http';
import { IData, IMiddleware } from '../interfaces/middleware';

export interface IOptions {
  operator: 'OR' | 'AND';
}

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredRoles: Roles[],
    private readonly options?: IOptions,
  ) {}

  async handle({ account }: IHttpRequest): Promise<IHttpResponse | IData> {
    if (!account) {
      return {
        statusCode: 403,
        body: {
          error: 'Access Denied.',
        },
      };
    }

    const filterFn = this.options?.operator === 'AND' ? 'every' : 'some';
    const isAllowed = this.requiredRoles[filterFn](role => (
      account.role === role
    ));

    if (!isAllowed) {
      return {
        statusCode: 403,
        body: {
          error: 'Access Denied.',
        },
      };
    }

    return {
      data: {},
    };
  }
}
