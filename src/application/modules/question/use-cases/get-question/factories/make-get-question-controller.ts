import { GetQuestionController } from '../get-question-controller';
import { makeGetQuestionUseCase } from './make-get-question-use-case';

export function makeGetQuestionController() {
  const getQuestionUseCase = makeGetQuestionUseCase();

  return new GetQuestionController(getQuestionUseCase);
}
