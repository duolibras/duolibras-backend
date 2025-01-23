import { DeleteAnswerController } from '../delete-answer-controller';
import { makeDeleteAnswerUseCase } from './make-delete-answer-use-case';

export function makeDeleteAnswerController() {
  const useCase = makeDeleteAnswerUseCase();

  return new DeleteAnswerController(useCase);
}
