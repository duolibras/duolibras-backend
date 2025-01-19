import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { MachineLearningModel } from '../../entities/machine-learning-model';
import { MachineLearningModelRepository } from '../../repositories/machine-learning-model-repository';

interface IInput {
  name: string;
  description: string;
  metadataUrl: string;
  modelUrl: string;
  weightsUrl: string;
}

interface IOutput {
  machinelearningmodel: MachineLearningModel;
}

export class CreateMachineLearningModelUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly machinelearningmodelRepo: MachineLearningModelRepository,
  ) {}

  async execute({ name, description, metadataUrl, modelUrl, weightsUrl }: IInput): Promise<IOutput> {
    const machinelearningmodel = new MachineLearningModel({
      name,
      description,
      metadataUrl,
      modelUrl,
      weightsUrl,
    });

    try {
      await this.machinelearningmodelRepo.createMachineLearningModel(machinelearningmodel);

      return {
        machinelearningmodel
      };
    } catch {
      throw new InternalServerHTTPError('Erro ao criar MachineLearningModel');
    }
  }
}
