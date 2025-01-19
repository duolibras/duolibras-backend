import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaConnectMachineLearningModel(lessonId: string, machineLearningModelId: string) {
  const lessonModelAlreadyExists = await prismaClient.lessonMachineLearningModel.findUnique({
    where: {
      lessonId_machineLearningModelId: {
        lessonId,
        machineLearningModelId,
      }
    },
  });

  if (lessonModelAlreadyExists) {
    return;
  }

  await prismaClient.lessonMachineLearningModel.create({
    data: {
      lessonId,
      machineLearningModelId,
    },
  });
}
