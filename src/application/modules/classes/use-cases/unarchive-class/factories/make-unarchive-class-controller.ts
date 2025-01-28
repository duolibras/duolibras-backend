import { UnarchiveClassController } from '../unarchive-class-controller';
import { makeUnarchiveClassUseCase } from './make-unarchive-class-use-case';

export function makeUnarchiveClassController() {
  const useCase = makeUnarchiveClassUseCase();

  return new UnarchiveClassController(useCase);
}
