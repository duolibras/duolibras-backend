import { makeChangeChaptersCountUseCase } from '@/application/modules/unit/use-cases/change-chapters-count/factories/make-change-chapters-count-use-case';
import { makeChapterRepository } from '../../../repositories/make-chapter-repository';
import { DeleteChapterUseCase } from '../delete-chapter-use-case';

export function makeDeleteChapterUseCase() {
  const chapterRepo = makeChapterRepository();
  const changeChaptersCountUseCase = makeChangeChaptersCountUseCase();

  return new DeleteChapterUseCase(chapterRepo, changeChaptersCountUseCase);
}
