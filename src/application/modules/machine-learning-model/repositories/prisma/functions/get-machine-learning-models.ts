import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { MachineLearningModel } from '../../../entities/machine-learning-model';
import { MachineLearningModelMapper } from '../../../mappers/machine-learning-model-mapper';

export async function prismaGetMachineLearningModels(): Promise<MachineLearningModel[]> {
  const machinelearningmodels = await prismaClient.machineLearningModel.findMany({
    orderBy: {
      id: 'asc',
    }
  });

  return machinelearningmodels.map(MachineLearningModelMapper.toDomain);
}
