import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { UserJourneyStatus } from '../../entities/journey';

export async function prismaCompleteUnit(chapterId: string, accountId: string) {
  const chapter = await prismaClient.chapter.findUnique({
    where: { id: chapterId },
    select: {
      unit: {
        select: {
          id: true,
          chaptersCount: true,
          usersJourneysStatus: {
            where: {
              accountId,
            },
            select: {
              chaptersCompletedCount: true,
            }
          }
        }
      }
    }
  });

  const unitId = chapter!.unit.id;
  const chaptersCompletedCount = chapter?.unit?.usersJourneysStatus?.[0]?.chaptersCompletedCount ?? 0;
  const chaptersCount = chapter!.unit.chaptersCount;

  if (chaptersCount === chaptersCompletedCount + 1) {
    await prismaClient.unitUserJourneyStatus.upsert({
      where: {
        accountId_unitId: {
          accountId,
          unitId,
        },
      },
      create: {
        accountId,
        unitId,
        status: UserJourneyStatus.ACCOMPLISHED,
        chaptersCompletedCount: chaptersCompletedCount + 1,
      },
      update: {
        status: UserJourneyStatus.ACCOMPLISHED,
        chaptersCompletedCount: chaptersCompletedCount + 1,
      }
    });
  } else {
    await prismaClient.unitUserJourneyStatus.upsert({
      where: {
        accountId_unitId: {
          unitId,
          accountId,
        }
      },
      create: {
        accountId,
        unitId,
        status: UserJourneyStatus.AVAILABLE,
        chaptersCompletedCount: chaptersCompletedCount + 1
      },
      update: {
        chaptersCompletedCount: chaptersCompletedCount + 1
      }
    });
  }
}
