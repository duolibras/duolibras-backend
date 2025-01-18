
import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeQuestionRepository } from '../../../repositories/make-question-repository';
import { CreateQuestionUseCase } from '../create-question-use-case';

export function makeCreateQuestionUseCase() {
  const questionRepo = makeQuestionRepository();
  const lessonRepo = makeLessonRepository();

  return new CreateQuestionUseCase(questionRepo, lessonRepo);
}
