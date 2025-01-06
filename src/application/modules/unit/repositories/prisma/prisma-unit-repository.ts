import { CountOperation } from '@/application/shared/types/count-operation';
import { Unit } from '../../entities/unit';
import { UnitRepository } from '../unit-repository';
import { prismaChangeChapertsCount } from './functions/change-chapters-count';
import { prismaCreateUnit } from './functions/create-unit';
import { prismaDeleteUnit } from './functions/delete-unit';
import { prismaGetUnit } from './functions/get-unit';
import { prismaGetUnits } from './functions/get-units';
import { prismaUpdateUnit } from './functions/update-unit';

export class PrismaUnitRepository implements UnitRepository {
  async changeChaptersCount(unitId: string, operation: CountOperation): Promise<void> {
    await prismaChangeChapertsCount(unitId, operation);
  }

  async getUnit(unitId: string): Promise<Unit | null> {
    return prismaGetUnit(unitId);
  }
  async createUnit(unit: Unit): Promise<void> {
    return prismaCreateUnit(unit);
  }

  async updateUnit(unit: Unit): Promise<void> {
    return prismaUpdateUnit(unit);
  }

  async deleteUnit(unitId: string): Promise<void> {
    return prismaDeleteUnit(unitId);
  }

  async getUnits(): Promise<Unit[]> {
    return prismaGetUnits();
  }
}
