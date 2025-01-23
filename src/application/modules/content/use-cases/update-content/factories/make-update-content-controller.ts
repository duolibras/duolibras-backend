import { UpdateContentController } from '../update-content-controller';
import { makeUpdateContentUseCase } from './make-update-content-use-case';

export function makeUpdateContentController() {
  const useCase = makeUpdateContentUseCase();

  return new UpdateContentController(useCase);
}
