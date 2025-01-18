import { CreateAnswerController } from '../create-answer-controller';
import { makeCreateAnswerUseCase } from './make-create-answer-use-case';

export function makeCreateAnswerController() {
  const createAnswerUseCase = makeCreateAnswerUseCase();

  return new CreateAnswerController(createAnswerUseCase);
}
