import { SignUpStudentController } from '../sign-up-student-controller';
import { makeSignUpUseCase } from './make-sign-up-use-case';

export function makeSignUpStudentController() {
  const signUpUseCase = makeSignUpUseCase();

  return new SignUpStudentController(signUpUseCase);
}
