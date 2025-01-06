import { SignUpTeacherController } from '../sign-up-teacher-controller';
import { makeSignUpUseCase } from './make-sign-up-use-case';

export function makeSignUpTeacherController() {
  const signUpUseCase = makeSignUpUseCase();

  return new SignUpTeacherController(signUpUseCase);
}
