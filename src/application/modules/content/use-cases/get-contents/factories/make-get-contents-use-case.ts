import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeContentRepository } from '../../../repositories/make-content-repository';
import { GetContentsUseCase } from '../get-contents-use-case';

export function makeGetContentsUseCase() {
  const contentRepo = makeContentRepository();
  const lessonRepo = makeLessonRepository();

  return new GetContentsUseCase(contentRepo, lessonRepo);
}
