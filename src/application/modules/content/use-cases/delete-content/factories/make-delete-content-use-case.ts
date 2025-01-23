import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeContentRepository } from '../../../repositories/make-content-repository';
import { DeleteContentUseCase } from '../delete-content-use-case';

export function makeDeleteContentUseCase() {
  const contentRepo = makeContentRepository();
  const lessonRepo = makeLessonRepository();
  const storageProvider = makeStorageProvider();

  return new DeleteContentUseCase(contentRepo, lessonRepo, storageProvider);
}
