import { makeAuthRepository } from '../../../repositories/make-auth-repository';
import { GetProfileUseCase } from '../get-profile-use-case';

export function makeGetProfileUseCase() {
  const authRepository = makeAuthRepository();

  return new GetProfileUseCase(authRepository);
}
