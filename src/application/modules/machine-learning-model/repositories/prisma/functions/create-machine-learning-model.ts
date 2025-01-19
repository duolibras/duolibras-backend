import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { MachineLearningModel } from '../../../entities/machine-learning-model';
import { MachineLearningModelMapper } from '../../../mappers/machine-learning-model-mapper';

export async function prismaCreateMachineLearningModel(MachineLearningModel: MachineLearningModel) {
  await prismaClient.machineLearningModel.create({
    data: MachineLearningModelMapper.toPersistence(MachineLearningModel),
  });
}
