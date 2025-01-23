import { makeLessonRepository } from '../../../repositories/make-lesson-repository';
import { UpdateLessonUseCase } from '../update-lesson-use-case';

export function makeUpdateLessonUseCase() {
  const lessonRepo = makeLessonRepository();

  return new UpdateLessonUseCase(lessonRepo);
}
