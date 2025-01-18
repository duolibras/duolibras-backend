
import { makeQuestionRepository } from '@/application/modules/question/repositories/make-question-repository';
import { makeAnswerRepository } from '../../../repositories/make-answer-repository';
import { CreateAnswerUseCase } from '../create-answer-use-case';

export function makeCreateAnswerUseCase() {
  const answerRepo = makeAnswerRepository();
  const questionRepo = makeQuestionRepository();

  return new CreateAnswerUseCase(answerRepo, questionRepo);
}
