import { GetPublicJourneyController } from '../get-public-journey-controller';
import { makeGetMyJourneyUseCase } from './make-get-my-journey-use-case';

export function makeGetPublicJourneyController() {
  const useCase = makeGetMyJourneyUseCase();

  return new GetPublicJourneyController(useCase);
}
