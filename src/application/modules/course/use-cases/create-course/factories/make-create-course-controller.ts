import { CreateCourseController } from '../create-course-controller';
import { makeCreateCourseUseCase } from './make-create-course-use-case';

export function makeCreateCourseController() {
  const useCase = makeCreateCourseUseCase();

  return new CreateCourseController(useCase);
}
