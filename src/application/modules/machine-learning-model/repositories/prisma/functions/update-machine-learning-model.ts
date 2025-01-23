import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { MachineLearningModel } from '../../../entities/machine-learning-model';
import { MachineLearningModelMapper } from '../../../mappers/machine-learning-model-mapper';

export async function prismaUpdateMachineLearningModel(machinelearningmodel: MachineLearningModel) {
  await prismaClient.machineLearningModel.update({
    where: { id: machinelearningmodel.id },
    data: MachineLearningModelMapper.toPersistence(machinelearningmodel),
  });
}
