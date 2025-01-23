import { makeContentRepository } from '../../../repositories/make-content-repository';
import { GetContentUseCase } from '../get-content-use-case';

export function makeGetContentUseCase() {
  const contentRepo = makeContentRepository();

  return new GetContentUseCase(contentRepo);
}
