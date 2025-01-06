export interface DecodedAccount {
  sub?: string;
  role: string;
}

export interface TokenOptions {
  sub: string;
  role: string;
  expiresIn: string;
}

export interface RefreshTokenOptions {
  subject: string;
  expiresIn: string;
}

export interface TokenProvider {
  generateToken(options: TokenOptions): string;
  verifyToken(token: string): DecodedAccount;
}

