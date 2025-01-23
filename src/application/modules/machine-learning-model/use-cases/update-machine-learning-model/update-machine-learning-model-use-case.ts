import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { StorageProvider } from '@/application/shared/providers/storage-provider/storage-provider';
import { MachineLearningModel } from '../../entities/machine-learning-model';
import { MachineLearningModelRepository } from '../../repositories/machine-learning-model-repository';

interface IInput {
  machineLearningModelId: string;
  name?: string;
  description?: string;
  metadata?: string;
  model?: string;
  weights?: string;
}

interface IOutput {
  machinelearningmodel: MachineLearningModel;
}

export class UpdateMachineLearningModelUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly machinelearningmodelRepo: MachineLearningModelRepository,
    private readonly storageProvider: StorageProvider,
  ) {}

  async execute({ machineLearningModelId, name, description, metadata, model, weights }: IInput): Promise<IOutput> {
    const machinelearningmodelFound = await this.machinelearningmodelRepo.getMachineLearningModel(machineLearningModelId);

    if (!machinelearningmodelFound) {
      throw new NotFoundHTTPError('Unidade não encontrada');
    }

    let metadataKey = machinelearningmodelFound.metadataKey;
    let modelKey = machinelearningmodelFound.modelKey;
    let weightsKey = machinelearningmodelFound.weightsKey;

    if (metadata) {
      await this.storageProvider.remove(machinelearningmodelFound.metadataKey);

      const metadataFile = await this.storageProvider.save(metadata);
      metadataKey = metadataFile.fileKey;
    }
    if (model) {
      await this.storageProvider.remove(machinelearningmodelFound.modelKey);

      const modelFile = await this.storageProvider.save(model);
      modelKey = modelFile.fileKey;
    }
    if (weights) {
      await this.storageProvider.remove(machinelearningmodelFound.weightsKey);

      const weightsFile = await this.storageProvider.save(weights);
      weightsKey = weightsFile.fileKey;
    }

    const updatedMachineLearningModel = new MachineLearningModel({
      id: machinelearningmodelFound.id,
      name: name ?? machinelearningmodelFound.name,
      description: description ?? machinelearningmodelFound.description,
      metadataKey: metadataKey,
      modelKey: modelKey,
      weightsKey: weightsKey,
      createdAt: machinelearningmodelFound.createdAt,
    });

    try {
      await updatedMachineLearningModel.generatePresignedUrls();

      await this.machinelearningmodelRepo.updateMachineLearningModel(updatedMachineLearningModel);

      return {
        machinelearningmodel: updatedMachineLearningModel,
      };
    } catch {
      throw new InternalServerHTTPError('Algo deu errado ao atualizar a unidade');
    }



  }
}
