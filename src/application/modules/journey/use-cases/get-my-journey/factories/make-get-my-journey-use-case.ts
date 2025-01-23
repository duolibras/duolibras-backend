import { makeJourneyRepository } from '../../../repositories/make-journey-repository';
import { GetMyJourneyUseCase } from '../get-my-journey-use-case';

export function makeGetMyJourneyUseCase() {
  const journeyRepo = makeJourneyRepository();

  return new GetMyJourneyUseCase(journeyRepo);
}
