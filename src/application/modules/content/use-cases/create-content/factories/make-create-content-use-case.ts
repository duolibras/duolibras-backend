
import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeContentRepository } from '../../../repositories/make-content-repository';
import { CreateContentUseCase } from '../create-content-use-case';

export function makeCreateContentUseCase() {
  const contentRepo = makeContentRepository();
  const lessonRepo = makeLessonRepository();

  return new CreateContentUseCase(contentRepo, lessonRepo);
}
