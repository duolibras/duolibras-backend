import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { MachineLearningModelRepository } from '../../repositories/machine-learning-model-repository';

interface IInput {
  machineLearningModelId: string;
}

type IOutput = void;

export class DeleteMachineLearningModelUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly machinelearningmodelRepo: MachineLearningModelRepository,
  ) {}

  async execute({ machineLearningModelId }: IInput): Promise<void> {
    const machinelearningmodel = await this.machinelearningmodelRepo.getMachineLearningModel(machineLearningModelId);

    if (!machinelearningmodel) {
      throw new NotFoundHTTPError('MachineLearningModel não encontrado');
    }

    try {
      await this.machinelearningmodelRepo.deleteMachineLearningModel(machineLearningModelId);
    } catch {
      throw new InternalServerHTTPError('Ocorreu um erro ao excluir MachineLearningModel');
    }
  }
}
