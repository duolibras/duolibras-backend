import { Journey } from '../entities/journey';
import { prismaCompleteLesson } from './functions/complete-lesson';
import { prismaGetMyJourney } from './functions/get-my-journey';
import { JourneyRepository } from './journey-repository';

export class PrismaJourneyRepository implements JourneyRepository {
  async completeLesson(lessonId: string, accountId: string): Promise<void> {
    await prismaCompleteLesson(lessonId, accountId);
  }

  async getJourney(accountId?: string): Promise<Journey> {
    return prismaGetMyJourney(accountId);
  }
}
