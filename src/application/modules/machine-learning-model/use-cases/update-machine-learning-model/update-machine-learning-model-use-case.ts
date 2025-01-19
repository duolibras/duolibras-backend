import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { MachineLearningModel } from '../../entities/machine-learning-model';
import { MachineLearningModelRepository } from '../../repositories/machine-learning-model-repository';

interface IInput {
  machineLearningModelId: string;
  name?: string;
  description?: string;
  metadataUrl?: string;
  modelUrl?: string;
  weightsUrl?: string;
}

interface IOutput {
  machinelearningmodel: MachineLearningModel;
}

export class UpdateMachineLearningModelUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly machinelearningmodelRepo: MachineLearningModelRepository
  ) {}

  async execute({ machineLearningModelId, name, description, metadataUrl, modelUrl, weightsUrl }: IInput): Promise<IOutput> {
    const machinelearningmodelFound = await this.machinelearningmodelRepo.getMachineLearningModel(machineLearningModelId);

    if (!machinelearningmodelFound) {
      throw new NotFoundHTTPError('Unidade não encontrada');
    }

    const updatedMachineLearningModel = new MachineLearningModel({
      id: machinelearningmodelFound.id,
      name: name ?? machinelearningmodelFound.name,
      description: name ?? machinelearningmodelFound.description,
      metadataUrl: metadataUrl ?? machinelearningmodelFound.metadataUrl,
      modelUrl: modelUrl ?? machinelearningmodelFound.modelUrl,
      weightsUrl: weightsUrl ?? machinelearningmodelFound.weightsUrl,
      createdAt: machinelearningmodelFound.createdAt,
    });

    try {
      await this.machinelearningmodelRepo.updateMachineLearningModel(updatedMachineLearningModel);

      return {
        machinelearningmodel: updatedMachineLearningModel,
      };
    } catch {
      throw new InternalServerHTTPError('Algo deu errado ao atualizar a unidade');
    }



  }
}
