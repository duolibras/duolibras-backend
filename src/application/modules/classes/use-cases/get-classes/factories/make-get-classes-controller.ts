import { GetClassesController } from '../get-classes-controller';
import { makeGetClassesUseCase } from './make-get-classes-use-case';


export function makeGetClassesController() {
  const useCase = makeGetClassesUseCase();

  return new GetClassesController(useCase);
}
