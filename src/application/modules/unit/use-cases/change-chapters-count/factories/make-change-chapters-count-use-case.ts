import { makeUnitRepository } from '../../../repositories/make-unit-repository';
import { ChangeChaptersCountUseCase } from '../change-chapters-count-use-case';

export function makeChangeChaptersCountUseCase() {
  const unitRepo = makeUnitRepository();

  return new ChangeChaptersCountUseCase(unitRepo);
}
