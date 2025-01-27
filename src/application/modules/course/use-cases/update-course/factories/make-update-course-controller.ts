import { UpdateCourseController } from '../update-course-controller';
import { makeUpdateCourseUseCase } from './make-update-course-use-case';

export function makeUpdateCourseController() {
  const useCase = makeUpdateCourseUseCase();

  return new UpdateCourseController(useCase);
}
