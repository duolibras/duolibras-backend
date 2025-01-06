import { makeChapterRepository } from '@/application/modules/chapter/repositories/make-chapter-repository';
import { makeLessonRepository } from '../../../repositories/make-lesson-repository';
import { GetLessonsUseCase } from '../get-lessons-use-case';

export function makeGetLessonsUseCase() {
  const lessonRepo = makeLessonRepository();
  const chapterRepo = makeChapterRepository();

  return new GetLessonsUseCase(lessonRepo, chapterRepo);
}
