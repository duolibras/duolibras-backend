import { makeChapterRepository } from '../../../repositories/make-chapter-repository';
import { GetChaptersUseCase } from '../get-chapters-use-case';

export function makeGetChaptersUseCase() {
  const chapterRepo = makeChapterRepository();

  return new GetChaptersUseCase(chapterRepo);
}
