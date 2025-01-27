import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Journey } from '../../entities/journey';
import { JourneyMapper } from '../../mappers/jorney-mapper';

export async function prismaGetMyJourney(accountId?: string): Promise<Journey> {
  const units = await prismaClient.unit.findMany({
    orderBy: { id: 'asc' },
    include: {
      usersJourneysStatus: accountId ? {
        where: { accountId },
        select: { status: true, chaptersCompletedCount: true },
        take: 1,
      } : undefined,
      chapters: {
        orderBy: { id: 'asc' },
        include: {
          chaptersUserJourneyStatus: accountId ? {
            where: { accountId },
            select: { status: true, lessonsCompletedCount: true },
            take: 1,
          } : undefined,
          lessons: {
            orderBy: { id: 'asc' },
            include: {
              lessonsUserJourneyStatus: accountId ? {
                where: { accountId },
                select: { status: true },
                take: 1,
              } : undefined
            }
          }
        }
      },
    }
  });

  return JourneyMapper.toDomain(units);
}
