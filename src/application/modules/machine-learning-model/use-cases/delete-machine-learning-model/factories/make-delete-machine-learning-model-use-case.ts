import { makeMachineLearningModelRepository } from '../../../repositories/make-machine-learning-model-repository';
import { DeleteMachineLearningModelUseCase } from '../delete-machine-learning-model-use-case';

export function makeDeleteMachineLearningModelUseCase() {
  const machinelearningmodelRepo = makeMachineLearningModelRepository();

  return new DeleteMachineLearningModelUseCase(machinelearningmodelRepo);
}
