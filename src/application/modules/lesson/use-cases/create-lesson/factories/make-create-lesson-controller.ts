import { CreateLessonController } from '../create-lesson-controller';
import { makeCreateLessonUseCase } from './make-create-lesson-use-case';

export function makeCreateLessonController() {
  const createLessonUseCase = makeCreateLessonUseCase();

  return new CreateLessonController(createLessonUseCase);
}
