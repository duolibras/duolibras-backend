import { makeUnitRepository } from '@/application/modules/unit/repositories/make-unit-repository';
import { makeChapterRepository } from '../../../repositories/make-chapter-repository';
import { GetChaptersUseCase } from '../get-chapters-use-case';

export function makeGetChaptersUseCase() {
  const chapterRepo = makeChapterRepository();
  const unitRepo = makeUnitRepository();

  return new GetChaptersUseCase(chapterRepo, unitRepo);
}
