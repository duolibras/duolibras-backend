import { UpdateChapterController } from '../update-chapter-controller';
import { makeUpdateChapterUseCase } from './make-update-chapter-use-case';

export function makeUpdateChapterController() {
  const useCase = makeUpdateChapterUseCase();

  return new UpdateChapterController(useCase);
}
