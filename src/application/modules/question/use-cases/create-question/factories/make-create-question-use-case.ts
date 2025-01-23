
import { makeLessonRepository } from '@/application/modules/lesson/repositories/make-lesson-repository';
import { makeMachineLearningModelRepository } from '@/application/modules/machine-learning-model/repositories/make-machine-learning-model-repository';
import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeQuestionRepository } from '../../../repositories/make-question-repository';
import { CreateQuestionUseCase } from '../create-question-use-case';

export function makeCreateQuestionUseCase() {
  const questionRepo = makeQuestionRepository();
  const lessonRepo = makeLessonRepository();
  const machineLearningModelRepo = makeMachineLearningModelRepository();
  const storageProvider = makeStorageProvider();

  return new CreateQuestionUseCase(questionRepo, lessonRepo, machineLearningModelRepo, storageProvider);
}
