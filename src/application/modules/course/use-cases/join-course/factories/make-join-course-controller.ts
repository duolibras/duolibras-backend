import { JoinCourseController } from '../join-course-controller';
import { makeJoinCourseUseCase } from './make-join-course-use-case';

export function makeJoinCourseController() {
  const useCase = makeJoinCourseUseCase();

  return new JoinCourseController(useCase);
}
