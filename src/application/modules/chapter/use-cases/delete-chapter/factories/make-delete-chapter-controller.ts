import { DeleteChapterController } from '../delete-chapter-controller';
import { makeDeleteChapterUseCase } from './make-delete-chapter-use-case';

export function makeDeleteChapterController() {
  const useCase = makeDeleteChapterUseCase();

  return new DeleteChapterController(useCase);
}
