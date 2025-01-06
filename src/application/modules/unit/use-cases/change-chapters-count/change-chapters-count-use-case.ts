import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CountOperation } from '@/application/shared/types/count-operation';
import { UnitRepository } from '../../repositories/unit-repository';

interface IInput {
  unitId: string;
  operation: CountOperation
}

type IOutPut = void;

export class ChangeChaptersCountUseCase implements IUseCase<IInput, IOutPut> {
  constructor(
    private readonly unitRepo: UnitRepository,
  ) {}

  async execute({ operation, unitId }: IInput): Promise<void> {
    await this.unitRepo.changeChaptersCount(unitId, operation);
  }
}
