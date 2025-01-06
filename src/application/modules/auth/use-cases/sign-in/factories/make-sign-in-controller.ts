import { SignInController } from '../sign-in-controller';
import { makeSignInUseCase } from './make-sign-in-use-case';

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase();

  return new SignInController(signInUseCase);
}
