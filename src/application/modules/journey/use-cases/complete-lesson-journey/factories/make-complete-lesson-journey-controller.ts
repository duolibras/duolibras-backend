import { CompleteLessonJourneyController } from '../complete-lesson-journey-controller';
import { makeGetMyJourneyUseCase } from './make-complete-lesson-journey-use-case';

export function makeCompleteLessonJourneyController() {
  const useCase = makeGetMyJourneyUseCase();

  return new CompleteLessonJourneyController(useCase);
}
