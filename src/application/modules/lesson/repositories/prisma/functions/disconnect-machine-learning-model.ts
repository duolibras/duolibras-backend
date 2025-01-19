import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaDisconnectMachineLearningModel(lessonId: string, machineLearningModelId: string) {
  const questions = await prismaClient.question.findMany({
    where: {
      lessonId,
      machineLearningModelId,
    },
    select: {
      id: true,
    }
  });


  if (questions.length > 1) {
    return;
  }

  await prismaClient.lessonMachineLearningModel.delete({
    where: {
      lessonId_machineLearningModelId: {
        lessonId,
        machineLearningModelId,
      }
    }
  });
}
