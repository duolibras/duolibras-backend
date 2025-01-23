import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { CountOperation } from '@/application/shared/types/count-operation';
import { Unit } from '../../../entities/unit';

export async function prismaChangeChapertsCount(unit: Unit, operation: CountOperation) {
  const previousChapterCount = unit?.chaptersCount ?? 0;

  await prismaClient.unit.update({
    where: {
      id: unit.id,
    },
    data: {
      chaptersCount: operation === 'INCREMENT' ? previousChapterCount + 1 : previousChapterCount - 1
    }
  });
}
