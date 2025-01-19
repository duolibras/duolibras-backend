import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { MachineLearningModel } from '../../../entities/machine-learning-model';
import { MachineLearningModelMapper } from '../../../mappers/machine-learning-model-mapper';

export async function prismaGetMachineLearningModel(machinelearningmodelId: string): Promise<MachineLearningModel | null> {
  const machinelearningmodel = await prismaClient.machineLearningModel.findUnique({ where: { id: machinelearningmodelId } });

  return machinelearningmodel ? MachineLearningModelMapper.toDomain(machinelearningmodel) : null;
}
