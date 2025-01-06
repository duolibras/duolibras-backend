import { UpdateUnitController } from '../update-unit-controller';
import { makeUpdateUnitUseCase } from './make-update-unit-use-case';

export function makeUpdateUnitController() {
  const useCase = makeUpdateUnitUseCase();

  return new UpdateUnitController(useCase);
}
