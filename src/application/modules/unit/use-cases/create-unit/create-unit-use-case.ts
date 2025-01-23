import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Unit } from '../../entities/unit';
import { UnitRepository } from '../../repositories/unit-repository';

interface IInput {
  name: string;
}

interface IOutput {
  unit: Unit;
}

export class CreateUnitUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly unitRepo: UnitRepository,
  ) {}

  async execute({ name }: IInput): Promise<IOutput> {
    const unit = new Unit({
      name,
      chaptersCount: 0,
    });

    try {
      await this.unitRepo.createUnit(unit);

      return {
        unit
      };
    } catch {
      throw new InternalServerHTTPError('Erro ao criar unidade;');
    }
  }
}
