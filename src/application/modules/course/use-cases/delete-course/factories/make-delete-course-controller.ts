import { DeleteCourseController } from '../delete-course-controller';
import { makeDeleteCourseUseCase } from './make-delete-course-use-case';

export function makeDeleteCourseController() {
  const useCase = makeDeleteCourseUseCase();

  return new DeleteCourseController(useCase);
}
