import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeQuestionRepository } from '../../../repositories/make-question-repository';
import { UpdateQuestionUseCase } from '../update-question-use-case';

export function makeUpdateQuestionUseCase() {
  const questionRepo = makeQuestionRepository();
  const lessonRepo = makeLessonRepository();
  const storageProvider = makeStorageProvider();

  return new UpdateQuestionUseCase(questionRepo, lessonRepo, storageProvider);
}
