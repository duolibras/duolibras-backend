import { DeleteLessonController } from '../delete-lesson-controller';
import { makeDeleteLessonUseCase } from './make-delete-lesson-use-case';

export function makeDeleteLessonController() {
  const useCase = makeDeleteLessonUseCase();

  return new DeleteLessonController(useCase);
}
