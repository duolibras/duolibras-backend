import { GetCoursePreviewController } from '../get-course-preview-controller';
import { makeGetCoursePreviewUseCase } from './make-get-course-preview-use-case';

export function makeGetCoursePreviewController() {
  const useCase = makeGetCoursePreviewUseCase();

  return new GetCoursePreviewController(useCase);
}
