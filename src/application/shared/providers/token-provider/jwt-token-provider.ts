
import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { DecodedAccount, TokenOptions, TokenProvider } from './token-provider';

export class JWTTokenProvider implements TokenProvider {
  constructor(
    private readonly jwtSecret: string,
  ) {}

  generateToken(options: TokenOptions): string {
    const accessToken = sign(
      {
        sub: options.sub,
        role: options.role,
      },
      this.jwtSecret,
      { expiresIn: '1d' },
    );

    return accessToken;
  }

  verifyToken(token: string): DecodedAccount {
    const payload = verify(token, this.jwtSecret) as JwtPayload;

    return {
      sub: payload.sub,
      role: payload.role
    };
  }
}
