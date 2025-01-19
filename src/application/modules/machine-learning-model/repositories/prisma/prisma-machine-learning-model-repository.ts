import { MachineLearningModel } from '../../entities/machine-learning-model';
import { MachineLearningModelRepository } from '../machine-learning-model-repository';
import { prismaCreateMachineLearningModel } from './functions/create-machine-learning-model';
import { prismaDeleteMachineLearningModel } from './functions/delete-machine-learning-model';
import { prismaGetMachineLearningModel } from './functions/get-machine-learning-model';
import { prismaGetMachineLearningModels } from './functions/get-machine-learning-models';
import { prismaUpdateMachineLearningModel } from './functions/update-machine-learning-model';

export class PrismaMachineLearningModelRepository implements MachineLearningModelRepository {
  async getMachineLearningModel(MachineLearningModelId: string): Promise<MachineLearningModel | null> {
    return prismaGetMachineLearningModel(MachineLearningModelId);
  }
  async createMachineLearningModel(MachineLearningModel: MachineLearningModel): Promise<void> {
    return prismaCreateMachineLearningModel(MachineLearningModel);
  }

  async updateMachineLearningModel(MachineLearningModel: MachineLearningModel): Promise<void> {
    return prismaUpdateMachineLearningModel(MachineLearningModel);
  }

  async deleteMachineLearningModel(MachineLearningModelId: string): Promise<void> {
    return prismaDeleteMachineLearningModel(MachineLearningModelId);
  }

  async getMachineLearningModels(): Promise<MachineLearningModel[]> {
    return prismaGetMachineLearningModels();
  }
}
