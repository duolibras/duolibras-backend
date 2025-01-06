import { makeUnitRepository } from '../../../repositories/make-unit-repository';
import { GetUnitsUseCase } from '../get-units-use-case';

export function makeGetUnitsUseCase() {
  const unitRepo = makeUnitRepository();

  return new GetUnitsUseCase(unitRepo);
}
