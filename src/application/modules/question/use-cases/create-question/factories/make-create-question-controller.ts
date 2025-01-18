import { CreateQuestionController } from '../create-question-controller';
import { makeCreateQuestionUseCase } from './make-create-question-use-case';

export function makeCreateQuestionController() {
  const createQuestionUseCase = makeCreateQuestionUseCase();

  return new CreateQuestionController(createQuestionUseCase);
}
