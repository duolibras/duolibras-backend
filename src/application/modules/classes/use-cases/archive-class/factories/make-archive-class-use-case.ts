import { makeClassRepository } from '../../../repositories/make-class-repository';
import { ArchiveClassUseCase } from '../archive-class-use-case';

export function makeArchiveClassUseCase() {
  const classRepo = makeClassRepository();

  return new ArchiveClassUseCase(classRepo);
}
