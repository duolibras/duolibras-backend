import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Unit } from '../../../entities/unit';
import { UnitMapper } from '../../../mappers/unit-mapper';

export async function prismaCreateUnit(unit: Unit) {
  await prismaClient.unit.create({
    data: UnitMapper.toPersistence(unit),
  });
}
