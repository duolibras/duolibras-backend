import { makeContentRepository } from '../../../repositories/make-content-repository';
import { UpdateContentUseCase } from '../update-content-use-case';

export function makeUpdateContentUseCase() {
  const contentRepo = makeContentRepository();

  return new UpdateContentUseCase(contentRepo);
}
