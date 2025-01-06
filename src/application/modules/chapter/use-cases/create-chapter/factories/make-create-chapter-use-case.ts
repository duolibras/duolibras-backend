import { makeChangeChaptersCountUseCase } from '@/application/modules/unit/use-cases/change-chapters-count/factories/make-change-chapters-count-use-case';
import { makeChapterRepository } from '../../../repositories/make-chapter-repository';
import { CreateChapterUseCase } from '../create-chapter-use-case';

export function makeCreateChapterUseCase() {
  const chapterRepo = makeChapterRepository();
  const changeChaptersCountUseCase = makeChangeChaptersCountUseCase();

  return new CreateChapterUseCase(chapterRepo, changeChaptersCountUseCase);
}
