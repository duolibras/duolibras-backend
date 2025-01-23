import { CreateMachineLearningModelController } from '../create-machine-learning-model-controller';
import { makeCreateMachineLearningModelUseCase } from './make-create-machine-learning-model-use-case';

export function makeCreateMachineLearningModelController() {
  const createMachineLearningModelUseCase = makeCreateMachineLearningModelUseCase();

  return new CreateMachineLearningModelController(createMachineLearningModelUseCase);
}
