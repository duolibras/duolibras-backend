import { GetCoursesController } from '../get-courses-controller';
import { makeGetCoursesUseCase } from './make-get-courses-use-case';

export function makeGetCoursesController() {
  const useCase = makeGetCoursesUseCase();

  return new GetCoursesController(useCase);
}
