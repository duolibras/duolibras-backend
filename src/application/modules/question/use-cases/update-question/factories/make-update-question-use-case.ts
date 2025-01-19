import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeQuestionRepository } from '../../../repositories/make-question-repository';
import { UpdateQuestionUseCase } from '../update-question-use-case';

export function makeUpdateQuestionUseCase() {
  const questionRepo = makeQuestionRepository();
  const lessonRepo = makeLessonRepository();

  return new UpdateQuestionUseCase(questionRepo, lessonRepo);
}
