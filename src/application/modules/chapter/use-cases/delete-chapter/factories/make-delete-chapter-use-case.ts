
import { makeUnitRepository } from '@/application/modules/unit/repositories/make-unit-repository';
import { makeChapterRepository } from '../../../repositories/make-chapter-repository';
import { DeleteChapterUseCase } from '../delete-chapter-use-case';

export function makeDeleteChapterUseCase() {
  const chapterRepo = makeChapterRepository();
  const unitRepo = makeUnitRepository();

  return new DeleteChapterUseCase(chapterRepo, unitRepo);
}
