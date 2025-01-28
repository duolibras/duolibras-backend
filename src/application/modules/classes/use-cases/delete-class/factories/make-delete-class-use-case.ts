import { makeCourseRepository } from '@/application/modules/course/repositories/make-course-repository';
import { makeFileRepository } from '@/application/modules/file/repositories/make-file-repository';
import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeClassRepository } from '../../../repositories/make-class-repository';
import { DeleteClassUseCase } from '../delete-class-use-case';

export function makeDeleteClassUseCase() {
  const classRepo = makeClassRepository();
  const courseRepo = makeCourseRepository();
  const fileRepo = makeFileRepository();
  const storageProvider = makeStorageProvider();

  return new DeleteClassUseCase(classRepo, courseRepo, fileRepo, storageProvider);
}
