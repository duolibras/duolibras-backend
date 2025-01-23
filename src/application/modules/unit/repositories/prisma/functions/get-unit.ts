import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Unit } from '../../../entities/unit';
import { UnitMapper } from '../../../mappers/unit-mapper';

export async function prismaGetUnit(unitId: string): Promise<Unit | null> {
  const unit = await prismaClient.unit.findUnique({ where: { id: unitId } });

  return unit ? UnitMapper.toDomain(unit) : null;
}
