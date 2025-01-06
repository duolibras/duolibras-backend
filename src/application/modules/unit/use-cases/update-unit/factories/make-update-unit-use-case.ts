import { makeUnitRepository } from '../../../repositories/make-unit-repository';
import { UpdateUnitUseCase } from '../update-unit-use-case';

export function makeUpdateUnitUseCase() {
  const unitRepo = makeUnitRepository();

  return new UpdateUnitUseCase(unitRepo);
}
