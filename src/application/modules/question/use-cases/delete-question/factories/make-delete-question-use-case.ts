import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeQuestionRepository } from '../../../repositories/make-question-repository';
import { DeleteQuestionUseCase } from '../delete-question-use-case';

export function makeDeleteQuestionUseCase() {
  const questionRepo = makeQuestionRepository();
  const lessonRepo = makeLessonRepository();
  const storageProvider = makeStorageProvider();

  return new DeleteQuestionUseCase(questionRepo, lessonRepo, storageProvider);
}
