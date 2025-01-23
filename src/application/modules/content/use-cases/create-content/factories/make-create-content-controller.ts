import { CreateContentController } from '../create-content-controller';
import { makeCreateContentUseCase } from './make-create-content-use-case';

export function makeCreateContentController() {
  const createContentUseCase = makeCreateContentUseCase();

  return new CreateContentController(createContentUseCase);
}
