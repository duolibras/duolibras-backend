import { GetAnswersController } from '../get-answers-controller';
import { makeGetAnswersUseCase } from './make-get-answers-use-case';

export function makeGetAnswersController() {
  const getAnswersUseCase = makeGetAnswersUseCase();

  return new GetAnswersController(getAnswersUseCase);
}
