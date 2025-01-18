import { makeQuestionRepository } from '../../../repositories/make-question-repository';
import { GetQuestionUseCase } from '../get-question-use-case';

export function makeGetQuestionUseCase() {
  const questionRepo = makeQuestionRepository();

  return new GetQuestionUseCase(questionRepo);
}
