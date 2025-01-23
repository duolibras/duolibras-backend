import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Unit } from '../../../entities/unit';
import { UnitMapper } from '../../../mappers/unit-mapper';

export async function prismaGetUnits(): Promise<Unit[]> {
  const units = await prismaClient.unit.findMany({
    orderBy: {
      id: 'asc',
    }
  });

  return units.map(UnitMapper.toDomain);
}
