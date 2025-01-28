import { ArchiveClassController } from '../archive-class-controller';
import { makeArchiveClassUseCase } from './make-archive-class-use-case';

export function makeArchiveClassController() {
  const useCase = makeArchiveClassUseCase();

  return new ArchiveClassController(useCase);
}
