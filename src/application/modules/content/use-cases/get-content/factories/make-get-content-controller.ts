import { GetContentController } from '../get-content-controller';
import { makeGetContentUseCase } from './make-get-content-use-case';

export function makeGetContentController() {
  const getContentUseCase = makeGetContentUseCase();

  return new GetContentController(getContentUseCase);
}
