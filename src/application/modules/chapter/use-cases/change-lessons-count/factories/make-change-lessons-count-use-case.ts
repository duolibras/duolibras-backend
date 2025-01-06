import { makeChapterRepository } from '../../../repositories/make-chapter-repository';
import { ChangeLessonsCountUseCase } from '../change-lessons-count-use-case';

export function makeChangeLessonsCountUseCase() {
  const chapterRepo = makeChapterRepository();

  return new ChangeLessonsCountUseCase(chapterRepo);
}
