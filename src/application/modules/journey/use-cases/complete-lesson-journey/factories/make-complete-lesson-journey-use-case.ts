import { makeJourneyRepository } from '../../../repositories/make-journey-repository';
import { CompleteLessonJourneyUseCase } from '../complete-lesson-journey-use-case';


export function makeGetMyJourneyUseCase() {
  const journeyRepo = makeJourneyRepository();

  return new CompleteLessonJourneyUseCase(journeyRepo);
}
