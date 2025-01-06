import { DeleteUnitController } from '../delete-unit-controller';
import { makeDeleteUnitUseCase } from './make-delete-unit-use-case';

export function makeDeleteUnitController() {
  const useCase = makeDeleteUnitUseCase();

  return new DeleteUnitController(useCase);
}
