import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeMachineLearningModelRepository } from '../../../repositories/make-machine-learning-model-repository';
import { CreateMachineLearningModelUseCase } from '../create-machine-learning-model-use-case';

export function makeCreateMachineLearningModelUseCase() {
  const machinelearningmodelRepo = makeMachineLearningModelRepository();
  const storageProvider = makeStorageProvider();

  return new CreateMachineLearningModelUseCase(machinelearningmodelRepo, storageProvider);
}
