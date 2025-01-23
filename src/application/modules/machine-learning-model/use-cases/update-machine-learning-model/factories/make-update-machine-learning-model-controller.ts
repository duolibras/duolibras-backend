import { UpdateMachineLearningModelController } from '../update-machine-learning-model-controller';
import { makeUpdateMachineLearningModelUseCase } from './make-update-machine-learning-model-use-case';

export function makeUpdateMachineLearningModelController() {
  const useCase = makeUpdateMachineLearningModelUseCase();

  return new UpdateMachineLearningModelController(useCase);
}
