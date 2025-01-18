import { UpdateAnswerController } from '../update-answer-controller';
import { makeUpdateAnswerUseCase } from './make-update-answer-use-case';

export function makeUpdateAnswerController() {
  const useCase = makeUpdateAnswerUseCase();

  return new UpdateAnswerController(useCase);
}
