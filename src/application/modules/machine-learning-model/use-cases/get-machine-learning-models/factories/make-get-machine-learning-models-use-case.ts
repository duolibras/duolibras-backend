import { makeMachineLearningModelRepository } from '../../../repositories/make-machine-learning-model-repository';
import { GetMachineLearningModelsUseCase } from '../get-machine-learning-models-use-case';

export function makeGetMachineLearningModelsUseCase() {
  const machinelearningmodelRepo = makeMachineLearningModelRepository();

  return new GetMachineLearningModelsUseCase(machinelearningmodelRepo);
}
