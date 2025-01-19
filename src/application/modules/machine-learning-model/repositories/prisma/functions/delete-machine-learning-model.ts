import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaDeleteMachineLearningModel(machinelearningmodelId: string) {
  await prismaClient.machineLearningModel.delete({ where: { id: machinelearningmodelId } });
}
