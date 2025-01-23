import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { UserJourneyStatus } from '@prisma/client';
import { prismaCompleteUnit } from './complete-unit';

export async function prismaCompleteChapter(lessonId: string, accountId: string) {
  const lesson = await prismaClient.lesson.findUnique({
    where: { id: lessonId },
    select: {
      chapter: {
        select: {
          id: true,
          lessonsCount: true,
          chaptersUserJourneyStatus: {
            where: {
              accountId,
            },
            select: {
              lessonsCompletedCount: true,
            }
          }
        }
      }
    }
  });

  const chapterId = lesson!.chapter.id;
  const lessonsCompletedCount = lesson?.chapter?.chaptersUserJourneyStatus?.[0]?.lessonsCompletedCount ?? 0;
  const lessonsCount = lesson!.chapter.lessonsCount;

  if (lessonsCount === lessonsCompletedCount + 1) {
    await prismaClient.chapterUserJourneyStatus.upsert({
      where: {
        accountId_chapterId: {
          accountId,
          chapterId,
        },
      },
      create: {
        accountId,
        chapterId,
        status: UserJourneyStatus.ACCOMPLISHED,
        lessonsCompletedCount: lessonsCompletedCount + 1,
      },
      update: {
        status: UserJourneyStatus.ACCOMPLISHED,
        lessonsCompletedCount: lessonsCompletedCount + 1,
      }
    });

    await prismaCompleteUnit(chapterId, accountId);
  } else {
    await prismaClient.chapterUserJourneyStatus.upsert({
      where: {
        accountId_chapterId: {
          chapterId,
          accountId,
        }
      },
      create: {
        accountId,
        chapterId,
        status: UserJourneyStatus.AVAILABLE,
        lessonsCompletedCount: lessonsCompletedCount + 1
      },
      update: {
        lessonsCompletedCount: lessonsCompletedCount + 1
      }
    });
  }
}
