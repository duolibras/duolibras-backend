import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { CountOperation } from '@/application/shared/types/count-operation';

export async function prismaChangeModulesCount(lessonId: string, operation: CountOperation) {
  const lesson = await prismaClient.lesson.findUnique({ where: { id: lessonId }, select: { modulesCount: true } });

  const previousModuleCount = lesson?.modulesCount ?? 0;

  await prismaClient.lesson.update({
    where: {
      id: lessonId,
    },
    data: {
      modulesCount: operation === 'INCREMENT' ? previousModuleCount + 1 : previousModuleCount - 1
    }
  });
}
