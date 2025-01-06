import { makeHashProvider } from '@/application/shared/providers/hash-provider/make-hash-provider';
import { makeTokenProvider } from '@/application/shared/providers/token-provider/make-token-provider';
import { makeAuthRepository } from '../../../repositories/make-auth-repository';
import { SignInUseCase } from '../sing-in-use-case';

export function makeSignInUseCase() {
  const authRepository = makeAuthRepository();
  const hashProvider = makeHashProvider();
  const tokenProvider = makeTokenProvider();

  return new SignInUseCase(authRepository, hashProvider, tokenProvider);
}
