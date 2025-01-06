import { makeLessonRepository } from '../../../repositories/make-lesson-repository';
import { GetLessonsUseCase } from '../get-lessons-use-case';

export function makeGetLessonsUseCase() {
  const lessonRepo = makeLessonRepository();

  return new GetLessonsUseCase(lessonRepo);
}
