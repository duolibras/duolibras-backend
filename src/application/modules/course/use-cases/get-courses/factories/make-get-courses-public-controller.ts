import { GetCoursesPublicController } from '../get-courses-public-controller';
import { makeGetCoursesUseCase } from './make-get-courses-use-case';

export function makeGetCoursesPublicController() {
  const useCase = makeGetCoursesUseCase();

  return new GetCoursesPublicController(useCase);
}
