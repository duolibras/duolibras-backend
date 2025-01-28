import { makeCourseRepository } from '@/application/modules/course/repositories/make-course-repository';
import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeClassRepository } from '../../../repositories/make-class-repository';
import { CreateClassUseCase } from '../create-class-use-case';

export function makeCreateClassUseCase() {
  const classRepo = makeClassRepository();
  const courseRepo = makeCourseRepository();
  const storageProvider = makeStorageProvider();

  return new CreateClassUseCase(classRepo, courseRepo, storageProvider);
}
