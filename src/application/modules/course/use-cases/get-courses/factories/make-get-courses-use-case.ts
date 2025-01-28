import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { GetCoursesUseCase } from '../get-courses-use-case';

export function makeGetCoursesUseCase() {
  const courseRepo = makeCourseRepository();

  return new GetCoursesUseCase(courseRepo);
}
