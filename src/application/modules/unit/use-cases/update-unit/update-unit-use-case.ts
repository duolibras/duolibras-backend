import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Unit } from '../../entities/unit';
import { UnitRepository } from '../../repositories/unit-repository';

interface IInput {
  unitId: string;
  name?: string;
}

interface IOutput {
  unit: Unit;
}

export class UpdateUnitUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly unitRepo: UnitRepository
  ) {}

  async execute({ unitId, name }: IInput): Promise<IOutput> {
    const unitFound = await this.unitRepo.getUnit(unitId);

    if (!unitFound) {
      throw new NotFoundHTTPError('Unidade não encontrada');
    }

    const updatedUnit = new Unit({
      id: unitFound.id,
      name: name ?? unitFound.name,
      chaptersCount: unitFound.chaptersCount,
      createdAt: unitFound.createdAt,
    });

    try {
      await this.unitRepo.updateUnit(updatedUnit);

      return {
        unit: updatedUnit,
      };
    } catch {
      throw new InternalServerHTTPError('Algo deu errado ao atualizar a unidade');
    }



  }
}
