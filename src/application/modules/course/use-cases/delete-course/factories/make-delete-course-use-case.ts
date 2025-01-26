import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { DeleteCourseUseCase } from '../delete-course-use-case';

export function makeDeleteCourseUseCase() {
  const courseRepo = makeCourseRepository();

  return new DeleteCourseUseCase(courseRepo);
}
