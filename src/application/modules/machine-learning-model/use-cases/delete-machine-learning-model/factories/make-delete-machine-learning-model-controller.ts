import { DeleteMachineLearningModelController } from '../delete-machine-learning-model-controller';
import { makeDeleteMachineLearningModelUseCase } from './make-delete-machine-learning-model-use-case';

export function makeDeleteMachineLearningModelController() {
  const useCase = makeDeleteMachineLearningModelUseCase();

  return new DeleteMachineLearningModelController(useCase);
}
