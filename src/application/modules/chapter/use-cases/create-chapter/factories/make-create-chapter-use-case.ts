import { makeUnitRepository } from '@/application/modules/unit/repositories/make-unit-repository';
import { makeChapterRepository } from '../../../repositories/make-chapter-repository';
import { CreateChapterUseCase } from '../create-chapter-use-case';

export function makeCreateChapterUseCase() {
  const chapterRepo = makeChapterRepository();
  const unitRepo = makeUnitRepository();

  return new CreateChapterUseCase(chapterRepo, unitRepo);
}
