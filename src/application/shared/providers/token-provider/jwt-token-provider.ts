
import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { DecodedAccount, DecodedStripe, StripeTokenOptions, TokenOptions, TokenProvider } from './token-provider';

export class JWTTokenProvider implements TokenProvider {
  constructor(
    private readonly jwtSecret: string,
  ) {}
  generateStripeToken(options: StripeTokenOptions): string {
    const stripeToken = sign(
      {
        sub: options.sub,
      },
      this.jwtSecret,
      { expiresIn: options.expiresIn ?? '30m' },
    );

    return stripeToken;
  }

  verifyStripeToken(token: string): DecodedStripe {
    const payload = verify(token, this.jwtSecret) as JwtPayload;

    return {
      sub: payload.sub,
    };
  }

  generateToken(options: TokenOptions): string {
    const accessToken = sign(
      {
        sub: options.sub,
        role: options.role,
      },
      this.jwtSecret,
      { expiresIn: options.expiresIn ?? '1d' },
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
