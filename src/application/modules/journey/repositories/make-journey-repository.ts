import { PrismaJourneyRepository } from './prisma-journey-repository';

export function makeJourneyRepository() {
  return new PrismaJourneyRepository();
}
