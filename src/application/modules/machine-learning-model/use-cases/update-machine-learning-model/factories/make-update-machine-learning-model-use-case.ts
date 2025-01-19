import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeMachineLearningModelRepository } from '../../../repositories/make-machine-learning-model-repository';
import { UpdateMachineLearningModelUseCase } from '../update-machine-learning-model-use-case';

export function makeUpdateMachineLearningModelUseCase() {
  const machinelearningmodelRepo = makeMachineLearningModelRepository();
  const storageProvider = makeStorageProvider();

  return new UpdateMachineLearningModelUseCase(machinelearningmodelRepo, storageProvider);
}
