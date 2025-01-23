import { UpdateQuestionController } from '../update-question-controller';
import { makeUpdateQuestionUseCase } from './make-update-question-use-case';

export function makeUpdateQuestionController() {
  const useCase = makeUpdateQuestionUseCase();

  return new UpdateQuestionController(useCase);
}
