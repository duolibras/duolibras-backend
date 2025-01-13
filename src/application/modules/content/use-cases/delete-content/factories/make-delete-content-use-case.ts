import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeContentRepository } from '../../../repositories/make-content-repository';
import { DeleteContentUseCase } from '../delete-content-use-case';

export function makeDeleteContentUseCase() {
  const contentRepo = makeContentRepository();
  const lessonRepo = makeLessonRepository();

  return new DeleteContentUseCase(contentRepo, lessonRepo);
}
