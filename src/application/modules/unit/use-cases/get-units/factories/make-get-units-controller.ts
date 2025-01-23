import { GetUnitsController } from '../get-units-controller';
import { makeGetUnitsUseCase } from './make-get-units-use-case';

export function makeGetUnitsController() {
  const getUnitsUseCase = makeGetUnitsUseCase();

  return new GetUnitsController(getUnitsUseCase);
}
