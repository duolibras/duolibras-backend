import { GetModulesController } from '../get-modules-controller';
import { makeGetModulesUseCase } from './make-get-modules-use-case';

export function makeGetModulesController() {
  const getModulesUseCase = makeGetModulesUseCase();

  return new GetModulesController(getModulesUseCase);
}
