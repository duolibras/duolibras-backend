import { DeleteClassController } from '../delete-class-controller';
import { makeDeleteClassUseCase } from './make-delete-class-use-case';

export function makeDeleteClassController() {
  const useCase = makeDeleteClassUseCase();

  return new DeleteClassController(useCase);
}
