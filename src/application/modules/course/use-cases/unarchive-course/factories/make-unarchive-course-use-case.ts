import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { UnarchiveCourseUseCase } from '../unarchive-course-use-case';

export function makeUnarchiveCourseUseCase() {
  const courseRepo = makeCourseRepository();

  return new UnarchiveCourseUseCase(courseRepo);
}
