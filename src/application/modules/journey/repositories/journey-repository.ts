import { Journey } from '../entities/journey';

export interface JourneyRepository {
  getJourney(accountId?: string): Promise<Journey>
  completeLesson(lessonId: string, accountId: string): Promise<void>;
}
