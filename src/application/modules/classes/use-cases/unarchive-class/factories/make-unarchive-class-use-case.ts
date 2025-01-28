import { makeClassRepository } from '../../../repositories/make-class-repository';
import { UnarchiveClassUseCase } from '../unarchive-class-use-case';

export function makeUnarchiveClassUseCase() {
  const classRepo = makeClassRepository();

  return new UnarchiveClassUseCase(classRepo);
}
