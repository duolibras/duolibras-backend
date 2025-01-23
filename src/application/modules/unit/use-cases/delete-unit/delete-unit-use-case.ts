import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { UnitRepository } from '../../repositories/unit-repository';

interface IInput {
  unitId: string;
}

type IOutput = void;

export class DeleteUnitUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly unitRepo: UnitRepository,
  ) {}

  async execute({ unitId }: IInput): Promise<void> {
    const unit = await this.unitRepo.getUnit(unitId);

    if (!unit) {
      throw new NotFoundHTTPError('Unidade não encontrada');
    }

    try {
      await this.unitRepo.deleteUnit(unitId);
    } catch {
      throw new InternalServerHTTPError('Ocorreu um erro ao excluir unidade');
    }
  }
}
