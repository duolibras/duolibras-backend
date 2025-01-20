import { GetMyJourneyController } from '../get-my-journey-controller';
import { makeGetMyJourneyUseCase } from './make-get-my-journey-use-case';

export function makeGetMyJourneyController() {
  const useCase = makeGetMyJourneyUseCase();

  return new GetMyJourneyController(useCase);
}
