import { GetContentsController } from '../get-contents-controller';
import { makeGetContentsUseCase } from './make-get-contents-use-case';

export function makeGetContentsController() {
  const getContentsUseCase = makeGetContentsUseCase();

  return new GetContentsController(getContentsUseCase);
}
