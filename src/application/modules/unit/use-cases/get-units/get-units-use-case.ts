import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Unit } from '../../entities/unit';
import { UnitRepository } from '../../repositories/unit-repository';

type IInput = void;

interface IOutput {
  units: Unit[];
}

export class GetUnitsUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly unitRepo: UnitRepository,
  ) {}

  async execute(): Promise<IOutput> {
    const units = await this.unitRepo.getUnits();

    return {
      units
    };
  }
}
