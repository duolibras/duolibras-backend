import { makeUnitRepository } from '../../../repositories/make-unit-repository';
import { CreateUnitUseCase } from '../create-unit-use-case';

export function makeCreateUnitUseCase() {
  const unitRepo = makeUnitRepository();

  return new CreateUnitUseCase(unitRepo);
}
