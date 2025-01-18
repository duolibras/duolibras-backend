import { DeleteQuestionController } from '../delete-question-controller';
import { makeDeleteQuestionUseCase } from './make-delete-question-use-case';

export function makeDeleteQuestionController() {
  const useCase = makeDeleteQuestionUseCase();

  return new DeleteQuestionController(useCase);
}
