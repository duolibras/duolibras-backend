import { makeMachineLearningModelRepository } from '../../../repositories/make-machine-learning-model-repository';
import { UpdateMachineLearningModelUseCase } from '../update-machine-learning-model-use-case';

export function makeUpdateMachineLearningModelUseCase() {
  const machinelearningmodelRepo = makeMachineLearningModelRepository();

  return new UpdateMachineLearningModelUseCase(machinelearningmodelRepo);
}
