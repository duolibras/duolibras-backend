
import { TokenProvider } from '../../providers/token-provider/token-provider';
import { UnauthorizedHTTPError } from '../errors/unauthorized-http-error';
import { IHttpRequest, IHttpResponse } from '../interfaces/http';
import { IData, IMiddleware } from '../interfaces/middleware';

export class AuthenticationMiddleware implements IMiddleware {
  constructor(
    private readonly tokenProvider: TokenProvider,
  ) {}

  async handle({ headers }: IHttpRequest): Promise<IHttpResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      throw new UnauthorizedHTTPError('Invalid access token');
    }

    try {
      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer') {
        throw new Error();
      }

      const payload = this.tokenProvider.verifyToken(token);

      return {
        data: {
          account: {
            id: payload.sub,
            role: payload.role,
          },
        },
      };
    } catch {
      throw new UnauthorizedHTTPError('Invalid access token');
    }
  }
}
