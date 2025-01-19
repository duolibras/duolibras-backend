
import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeMachineLearningModelRepository } from '@/application/modules/machine-learning-model/repositories/make-machine-learning-model-repository';
import { makeQuestionRepository } from '../../../repositories/make-question-repository';
import { CreateQuestionUseCase } from '../create-question-use-case';

export function makeCreateQuestionUseCase() {
  const questionRepo = makeQuestionRepository();
  const lessonRepo = makeLessonRepository();
  const machineLearningModelRepo = makeMachineLearningModelRepository();

  return new CreateQuestionUseCase(questionRepo, lessonRepo, machineLearningModelRepo);
}
