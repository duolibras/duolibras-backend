import { Journey } from '../entities/journey';

export interface JourneyRepository {
  getMyJourney(accountId: string): Promise<Journey>
}
