import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { GetCoursePreviewUseCase } from '../get-course-preview-use-case';

export function makeGetCoursePreviewUseCase() {
  const courseRepo = makeCourseRepository();
  const storageProvider = makeStorageProvider();

  return new GetCoursePreviewUseCase(courseRepo, storageProvider);
}
