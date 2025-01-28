import { UpdateClassController } from '../update-class-controller';
import { makeUpdateClassUseCase } from './make-update-class-use-case';

export function makeUpdateClassController() {
  const useCase = makeUpdateClassUseCase();

  return new UpdateClassController(useCase);
}
