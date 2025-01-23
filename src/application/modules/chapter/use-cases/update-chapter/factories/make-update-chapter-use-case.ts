import { makeChapterRepository } from '../../../repositories/make-chapter-repository';
import { UpdateChapterUseCase } from '../update-chapter-use-case';

export function makeUpdateChapterUseCase() {
  const chapterRepo = makeChapterRepository();

  return new UpdateChapterUseCase(chapterRepo);
}
