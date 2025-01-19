import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeMachineLearningModelRepository } from '../../../repositories/make-machine-learning-model-repository';
import { DeleteMachineLearningModelUseCase } from '../delete-machine-learning-model-use-case';

export function makeDeleteMachineLearningModelUseCase() {
  const machinelearningmodelRepo = makeMachineLearningModelRepository();
  const storageProvider = makeStorageProvider();

  return new DeleteMachineLearningModelUseCase(machinelearningmodelRepo, storageProvider);
}
