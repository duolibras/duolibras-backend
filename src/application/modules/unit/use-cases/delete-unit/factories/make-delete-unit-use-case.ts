import { makeUnitRepository } from '../../../repositories/make-unit-repository';
import { DeleteUnitUseCase } from '../delete-unit-use-case';

export function makeDeleteUnitUseCase() {
  const unitRepo = makeUnitRepository();

  return new DeleteUnitUseCase(unitRepo);
}
