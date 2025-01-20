import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Journey } from '../entities/journey';
import { JourneyMapper } from '../mappers/jorney-mapper';
import { JourneyRepository } from './journey-repository';

export class PrismaJourneyRepository implements JourneyRepository {
  async getMyJourney(accountId: string): Promise<Journey> {
    const units = await prismaClient.unit.findMany({
      orderBy: { id: 'asc' },
      include: {
        usersJourneysStatus: {
          where: { accountId },
          select: { status: true },
          take: 1,
        },
        chapters: {
          orderBy: { id: 'asc' },
          include: {
            chaptersUserJourneyStatus: {
              where: { accountId },
              select: { status: true },
              take: 1,
            },
            lessons: {
              orderBy: { id: 'asc' },
              include: {
                lessonsUserJourneyStatus: {
                  where: { accountId },
                  select: { status: true },
                  take: 1,
                }
              }
            }
          }
        },
      }
    });

    return JourneyMapper.toDomain(units);
  }
}
