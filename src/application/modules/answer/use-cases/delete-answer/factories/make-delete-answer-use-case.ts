import { makeAnswerRepository } from '../../../repositories/make-answer-repository';
import { DeleteAnswerUseCase } from '../delete-answer-use-case';

export function makeDeleteAnswerUseCase() {
  const answerRepo = makeAnswerRepository();

  return new DeleteAnswerUseCase(answerRepo);
}
