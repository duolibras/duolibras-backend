import { GetQuestionsController } from '../get-questions-controller';
import { makeGetQuestionsUseCase } from './make-get-questions-use-case';

export function makeGetQuestionsController() {
  const getQuestionsUseCase = makeGetQuestionsUseCase();

  return new GetQuestionsController(getQuestionsUseCase);
}
