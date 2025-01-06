import { makeHashProvider } from '@/application/shared/providers/hash-provider/make-hash-provider';
import { makeAuthRepository } from '../../../repositories/make-auth-repository';
import { SignUpUseCase } from '../sign-up-use-case';

export function makeSignUpUseCase() {
  const authRepo = makeAuthRepository();
  const hashProvider = makeHashProvider();

  return new SignUpUseCase(authRepo, hashProvider);
}
