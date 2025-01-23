import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeQuestionRepository } from '../../../repositories/make-question-repository';
import { GetQuestionsUseCase } from '../get-questions-use-case';

export function makeGetQuestionsUseCase() {
  const questionRepo = makeQuestionRepository();
  const lessonRepo = makeLessonRepository();

  return new GetQuestionsUseCase(questionRepo, lessonRepo);
}
