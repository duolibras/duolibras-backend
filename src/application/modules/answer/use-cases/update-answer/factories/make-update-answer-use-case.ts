import { makeAnswerRepository } from '../../../repositories/make-answer-repository';
import { UpdateAnswerUseCase } from '../update-answer-use-case';

export function makeUpdateAnswerUseCase() {
  const answerRepo = makeAnswerRepository();

  return new UpdateAnswerUseCase(answerRepo);
}
