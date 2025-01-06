import { GetLessonsController } from '../get-lessons-controller';
import { makeGetLessonsUseCase } from './make-get-lessons-use-case';

export function makeGetLessonsController() {
  const getLessonsUseCase = makeGetLessonsUseCase();

  return new GetLessonsController(getLessonsUseCase);
}
