import { GetChaptersController } from '../get-chapters-controller';
import { makeGetChaptersUseCase } from './make-get-chapters-use-case';

export function makeGetChaptersController() {
  const getChaptersUseCase = makeGetChaptersUseCase();

  return new GetChaptersController(getChaptersUseCase);
}
