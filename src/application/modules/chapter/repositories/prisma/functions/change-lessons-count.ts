import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { CountOperation } from '@/application/shared/types/count-operation';

export async function prismaChangeLessonsCount(chapterId: string, operation: CountOperation) {
  const chapter = await prismaClient.chapter.findUnique({ where: { id: chapterId }, select: { lessonsCount: true } });

  const previousLessonCount = chapter?.lessonsCount ?? 0;

  await prismaClient.chapter.update({
    where: {
      id: chapterId,
    },
    data: {
      lessonsCount: operation === 'INCREMENT' ? previousLessonCount + 1 : previousLessonCount - 1
    }
  });
}
