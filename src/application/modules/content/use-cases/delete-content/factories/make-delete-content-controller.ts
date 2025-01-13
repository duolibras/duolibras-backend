import { DeleteContentController } from '../delete-content-controller';
import { makeDeleteContentUseCase } from './make-delete-content-use-case';

export function makeDeleteContentController() {
  const useCase = makeDeleteContentUseCase();

  return new DeleteContentController(useCase);
}
