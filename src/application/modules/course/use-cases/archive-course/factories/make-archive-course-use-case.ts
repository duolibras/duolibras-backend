import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { ArchiveCourseUseCase } from '../archive-course-use-case';

export function makeArchiveCourseUseCase() {
  const courseRepo = makeCourseRepository();

  return new ArchiveCourseUseCase(courseRepo);
}
