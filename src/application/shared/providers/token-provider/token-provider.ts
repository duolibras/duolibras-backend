export interface DecodedAccount {
  sub?: string;
  role: string;
}

export interface DecodedStripe {
  sub?: string;
}

export interface TokenOptions {
  sub: string;
  role: string;
  expiresIn: string;
}


export interface StripeTokenOptions {
  sub: string;
  expiresIn?: string;
}

export interface TokenProvider {
  generateStripeToken(options: StripeTokenOptions): string;
  generateToken(options: TokenOptions): string;
  verifyToken(token: string): DecodedAccount;
  verifyStripeToken(token: string): DecodedStripe;
}

