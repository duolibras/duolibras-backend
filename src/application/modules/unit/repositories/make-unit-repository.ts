import { PrismaUnitRepository } from './prisma/prisma-unit-repository';
import { UnitRepository } from './unit-repository';

export function makeUnitRepository(): UnitRepository {
  return new PrismaUnitRepository();
}
