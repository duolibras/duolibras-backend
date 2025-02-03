import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { GetCourseUseCase } from '../get-course-use-case';

export function makeGetCourseUseCase() {
  const courseRepo = makeCourseRepository();

  return new GetCourseUseCase(courseRepo);
}
