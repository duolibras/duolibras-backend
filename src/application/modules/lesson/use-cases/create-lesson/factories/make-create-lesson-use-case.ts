
import { makeChapterRepository } from '@/application/modules/chapter/repositories/make-chapter-repository';
import { makeLessonRepository } from '../../../repositories/make-lesson-repository';
import { CreateLessonUseCase } from '../create-lesson-use-case';

export function makeCreateLessonUseCase() {
  const lessonRepo = makeLessonRepository();
  const chapterRepo = makeChapterRepository();

  return new CreateLessonUseCase(lessonRepo, chapterRepo);
}
