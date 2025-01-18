import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeQuestionRepository } from '../../../repositories/make-question-repository';
import { DeleteQuestionUseCase } from '../delete-question-use-case';

export function makeDeleteQuestionUseCase() {
  const questionRepo = makeQuestionRepository();
  const lessonRepo = makeLessonRepository();

  return new DeleteQuestionUseCase(questionRepo, lessonRepo);
}
