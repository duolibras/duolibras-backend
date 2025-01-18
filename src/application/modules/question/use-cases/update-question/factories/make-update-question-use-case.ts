import { makeQuestionRepository } from '../../../repositories/make-question-repository';
import { UpdateQuestionUseCase } from '../update-question-use-case';

export function makeUpdateQuestionUseCase() {
  const questionRepo = makeQuestionRepository();

  return new UpdateQuestionUseCase(questionRepo);
}
