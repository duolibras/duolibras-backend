import { GetCourseController } from '../get-course-controller';
import { makeGetCourseUseCase } from './make-get-course-use-case';

export function makeGetCourseController() {
  const useCase = makeGetCourseUseCase();

  return new GetCourseController(useCase);
}
