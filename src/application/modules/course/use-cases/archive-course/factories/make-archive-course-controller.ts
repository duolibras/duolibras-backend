import { ArchiveCourseController } from '../archive-course-controller';
import { makeArchiveCourseUseCase } from './make-archive-course-use-case';

export function makeArchiveCourseController() {
  const useCase = makeArchiveCourseUseCase();

  return new ArchiveCourseController(useCase);
}
