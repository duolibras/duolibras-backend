import { CreateUnitController } from '../create-unit-controller';
import { makeCreateUnitUseCase } from './make-create-unit-use-case';

export function makeCreateUnitController() {
  const createUnitUseCase = makeCreateUnitUseCase();

  return new CreateUnitController(createUnitUseCase);
}
