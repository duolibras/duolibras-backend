import { makeCourseRepository } from '@/application/modules/course/repositories/make-course-repository';
import { makeClassRepository } from '../../../repositories/make-class-repository';
import { GetClassesUseCase } from '../get-classes-use-case';

export function makeGetClassesUseCase() {
  const classRepo = makeClassRepository();
  const courseRepo = makeCourseRepository();

  return new GetClassesUseCase(classRepo, courseRepo);
}
