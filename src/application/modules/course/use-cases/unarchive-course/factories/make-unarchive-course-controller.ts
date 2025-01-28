import { UnarchiveCourseController } from '../unarchive-course-controller';
import { makeUnarchiveCourseUseCase } from './make-unarchive-course-use-case';

export function makeUnarchiveCourseController() {
  const useCase = makeUnarchiveCourseUseCase();

  return new UnarchiveCourseController(useCase);
}
