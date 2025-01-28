import { makeCourseRepository } from '@/application/modules/course/repositories/make-course-repository';
import { makeClassRepository } from '../../../repositories/make-class-repository';
import { GetClassVideoUseCase } from '../get-class-video-use-case';

export function makeGetClassVideoUseCase() {
  const classRepo = makeClassRepository();
  const courseRepo = makeCourseRepository();

  return new GetClassVideoUseCase(classRepo, courseRepo);
}
