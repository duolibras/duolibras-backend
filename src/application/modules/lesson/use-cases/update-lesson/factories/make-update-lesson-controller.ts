import { UpdateLessonController } from '../update-lesson-controller';
import { makeUpdateLessonUseCase } from './make-update-lesson-use-case';

export function makeUpdateLessonController() {
  const useCase = makeUpdateLessonUseCase();

  return new UpdateLessonController(useCase);
}
