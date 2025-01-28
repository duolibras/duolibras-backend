import { GetClassVideoController } from '../get-class-video-controller';
import { makeGetClassVideoUseCase } from './make-get-class-video-use-case';

export function makeGetClassVideoController() {
  const useCase = makeGetClassVideoUseCase();

  return new GetClassVideoController(useCase);
}
