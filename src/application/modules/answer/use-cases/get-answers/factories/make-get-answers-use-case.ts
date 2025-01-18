import { makeQuestionRepository } from '@/application/modules/question/repositories/make-question-repository';
import { makeAnswerRepository } from '../../../repositories/make-answer-repository';
import { GetAnswersUseCase } from '../get-answers-use-case';

export function makeGetAnswersUseCase() {
  const answerRepo = makeAnswerRepository();
  const questionRepo = makeQuestionRepository();

  return new GetAnswersUseCase(answerRepo, questionRepo);
}
