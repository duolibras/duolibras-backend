import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { MachineLearningModel } from '../../entities/machine-learning-model';
import { MachineLearningModelRepository } from '../../repositories/machine-learning-model-repository';

type IInput = void;

interface IOutput {
  machineLearningModels: MachineLearningModel[];
}

export class GetMachineLearningModelsUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly machinelearningmodelRepo: MachineLearningModelRepository,
  ) {}

  async execute(): Promise<IOutput> {
    const machineLearningModels = await this.machinelearningmodelRepo.getMachineLearningModels();

    await Promise.all(machineLearningModels.map(mlmModel => mlmModel.generatePresignedUrls()));

    return {
      machineLearningModels
    };
  }
}
