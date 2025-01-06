import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { CountOperation } from '@/application/shared/types/count-operation';

export async function prismaChangeChapertsCount(unitId: string, operation: CountOperation) {
  const unit = await prismaClient.unit.findUnique({ where: { id: unitId }, select: { chaptersCount: true } });

  const previousChapterCount = unit?.chaptersCount ?? 0;

  await prismaClient.unit.update({
    where: {
      id: unitId,
    },
    data: {
      chaptersCount: operation === 'INCREMENT' ? previousChapterCount + 1 : previousChapterCount - 1
    }
  });
}
