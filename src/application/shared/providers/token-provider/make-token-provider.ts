import { env } from '@/application/config/env';
import { JWTTokenProvider } from './jwt-token-provider';
import { TokenProvider } from './token-provider';

export function makeTokenProvider(): TokenProvider {
  return new JWTTokenProvider(env.jwtSecret);
}
