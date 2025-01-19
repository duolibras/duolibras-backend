import { GetMachineLearningModelsController } from '../get-machine-learning-models-controller';
import { makeGetMachineLearningModelsUseCase } from './make-get-machine-learning-models-use-case';

export function makeGetMachineLearningModelsController() {
  const getMachineLearningModelsUseCase = makeGetMachineLearningModelsUseCase();

  return new GetMachineLearningModelsController(getMachineLearningModelsUseCase);
}
