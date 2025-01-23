import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { FileStorageResult, StorageProvider } from '@/application/shared/providers/storage-provider/storage-provider';
import { MachineLearningModel } from '../../entities/machine-learning-model';
import { MachineLearningModelRepository } from '../../repositories/machine-learning-model-repository';

interface IInput {
  name: string;
  description: string;
  metadata: string;
  model: string;
  weights: string;
}

interface IOutput {
  machinelearningmodel: MachineLearningModel;
}

export class CreateMachineLearningModelUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly machinelearningmodelRepo: MachineLearningModelRepository,
    private readonly storageProvider: StorageProvider,
  ) {}

  async execute({ name, description, ...files }: IInput): Promise<IOutput> {
    const filesResult = await Promise.allSettled([
      this.storageProvider.save(files.metadata),
      this.storageProvider.save(files.model),
      this.storageProvider.save(files.weights),
    ]);

    if (filesResult.some((fileresult) => fileresult.status === 'rejected')) {
      const failedFiles = filesResult.find((fileResult) => fileResult.status === 'rejected');

      const successFullFiles = filesResult.filter((fileResult) => fileResult.status === 'fulfilled');

      await Promise.all(successFullFiles.map(file => this.storageProvider.remove(file.value.fileKey)));

      throw new InternalServerHTTPError('Erro ao salvar arquivos');
    }

    const [metadata, model, weights] = filesResult as PromiseFulfilledResult<FileStorageResult>[];


    const machinelearningmodel = new MachineLearningModel({
      name,
      description,
      metadataKey: metadata.value.fileKey,
      modelKey: model.value.fileKey,
      weightsKey: weights.value.fileKey,
    });

    try {
      await this.machinelearningmodelRepo.createMachineLearningModel(machinelearningmodel);

      await machinelearningmodel.generatePresignedUrls();

      return {
        machinelearningmodel
      };
    } catch {
      throw new InternalServerHTTPError('Erro ao criar MachineLearningModel');
    }
  }
}
