import { makeChapterRepository } from '@/application/modules/chapter/repositories/make-chapter-repository';
import { makeLessonRepository } from '../../../repositories/make-lesson-repository';
import { DeleteLessonUseCase } from '../delete-lesson-use-case';

export function makeDeleteLessonUseCase() {
  const lessonRepo = makeLessonRepository();
  const chapterRepo = makeChapterRepository();

  return new DeleteLessonUseCase(lessonRepo, chapterRepo);
}
