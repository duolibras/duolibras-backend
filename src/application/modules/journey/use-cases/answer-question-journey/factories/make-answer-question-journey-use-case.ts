import { makeAnswerRepository } from '@/application/modules/answer/repositories/make-answer-repository';
import { makeQuestionRepository } from '@/application/modules/question/repositories/make-question-repository';
import { AnswerQuestionJourneyUseCase } from '../answer-question-journey-use-case';

export function makeAnswerQuestionJourneyUseCase() {
  const questionRepo = makeQuestionRepository();
  const answerRepo = makeAnswerRepository();

  return new AnswerQuestionJourneyUseCase(questionRepo, answerRepo);
}
