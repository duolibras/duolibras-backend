
import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeContentRepository } from '../../../repositories/make-content-repository';
import { CreateContentUseCase } from '../create-content-use-case';

export function makeCreateContentUseCase() {
  const contentRepo = makeContentRepository();
  const lessonRepo = makeLessonRepository();
  const storageProvider = makeStorageProvider();

  return new CreateContentUseCase(contentRepo, lessonRepo, storageProvider);
}
