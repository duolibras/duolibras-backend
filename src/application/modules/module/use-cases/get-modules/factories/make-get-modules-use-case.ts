import { makeJourneyRepository } from '@/application/modules/journey/repositories/make-journey-repository';
import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeModuleRepository } from '../../../repositories/make-module-repository';
import { GetModulesUseCase } from '../get-modules-use-case';

export function makeGetModulesUseCase() {
  const moduleRepo = makeModuleRepository();
  const lessonRepo = makeLessonRepository();
  const journeyRepo = makeJourneyRepository();

  return new GetModulesUseCase(moduleRepo, lessonRepo, journeyRepo);
}
