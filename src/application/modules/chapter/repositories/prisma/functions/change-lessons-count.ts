import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { CountOperation } from '@/application/shared/types/count-operation';
import { Chapter } from '../../../entities/chapter';

export async function prismaChangeLessonsCount(chapter: Chapter, operation: CountOperation) {
  const previousLessonCount = chapter?.lessonsCount ?? 0;

  await prismaClient.chapter.update({
    where: {
      id: chapter.id,
    },
    data: {
      lessonsCount: operation === 'INCREMENT' ? previousLessonCount + 1 : previousLessonCount - 1
    }
  });
}
