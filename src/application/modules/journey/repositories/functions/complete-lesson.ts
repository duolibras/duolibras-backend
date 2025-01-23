import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { UserJourneyStatus } from '../../entities/journey';
import { prismaCompleteChapter } from './complete-chapter';

export async function prismaCompleteLesson(lessonId: string, accountId: string) {
  await prismaClient.lessonUserJourneyStatus.upsert({
    where: {
      accountId_lessonId: {
        accountId,
        lessonId,
      }
    },
    update: {
      status: UserJourneyStatus.ACCOMPLISHED,
    },
    create: {
      lessonId,
      accountId,
      status: UserJourneyStatus.ACCOMPLISHED,
    },
  });

  await prismaCompleteChapter(lessonId, accountId);
}
