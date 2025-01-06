import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Unit } from '../../../entities/unit';
import { UnitMapper } from '../../../mappers/unit-mapper';

export async function prismaUpdateUnit(unit: Unit) {
  await prismaClient.unit.update({
    where: { id: unit.id },
    data: UnitMapper.toPersistence(unit),
  });
}
