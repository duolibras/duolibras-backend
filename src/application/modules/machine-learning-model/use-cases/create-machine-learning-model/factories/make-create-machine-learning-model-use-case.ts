import { makeMachineLearningModelRepository } from '../../../repositories/make-machine-learning-model-repository';
import { CreateMachineLearningModelUseCase } from '../create-machine-learning-model-use-case';

export function makeCreateMachineLearningModelUseCase() {
  const machinelearningmodelRepo = makeMachineLearningModelRepository();

  return new CreateMachineLearningModelUseCase(machinelearningmodelRepo);
}
