import { CreateChapterController } from '../create-chapter-controller';
import { makeCreateChapterUseCase } from './make-create-chapter-use-case';

export function makeCreateChapterController() {
  const createChapterUseCase = makeCreateChapterUseCase();

  return new CreateChapterController(createChapterUseCase);
}
