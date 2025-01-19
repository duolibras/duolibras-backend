import { makeTokenProvider } from '@/application/shared/providers/token-provider/make-token-provider';
import { AuthenticationMiddleware } from '../authentication-middleware';

export function makeAuthenticationMiddleware() {
  const tokenProvider = makeTokenProvider();

  return new AuthenticationMiddleware(tokenProvider);
}
