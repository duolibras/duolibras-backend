import { CountOperation } from '@/application/shared/types/count-operation';
import { Unit } from '../entities/unit';

export interface UnitRepository {
  createUnit(unit: Unit): Promise<void>
  updateUnit(unit: Unit): Promise<void>
  deleteUnit(unitId: string): Promise<void>
  getUnits(): Promise<Unit[]>
  getUnit(unitId: string): Promise<Unit | null>
  changeChaptersCount(unitId: string, operation: CountOperation): Promise<void>;
}
