import { AnswerQuestionJourneyController } from '../answer-question-journey-controller';
import { makeAnswerQuestionJourneyUseCase } from './make-answer-question-journey-use-case';

export function makeAnswerQuestionJourneyController() {
  const useCase = makeAnswerQuestionJourneyUseCase();

  return new AnswerQuestionJourneyController(useCase);
}
