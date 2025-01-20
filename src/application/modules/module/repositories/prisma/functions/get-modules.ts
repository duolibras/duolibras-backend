import { MachineLearningModelMapper } from '@/application/modules/machine-learning-model/mappers/machine-learning-model-mapper';
import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { ModuleMapper } from '../../../mappers/module-mapper';
import { GetModulesResponse } from '../../module-repository';

export async function prismaGetModules(lessonId: string): Promise<GetModulesResponse> {
  const rawModules = await prismaClient.module.findMany({
    where: {
      lessonId,
    },
    orderBy: {
      id: 'asc',
    }
  });

  const rawMachineLearningModels = await prismaClient.lessonMachineLearningModel.findMany({
    where: { lessonId },
    include: {
      machineLearningModel: true,
    }
  });

  const modules = rawModules.map(ModuleMapper.toDomain);
  const lessonMachineLearningModels = rawMachineLearningModels.map(({ machineLearningModel }) => MachineLearningModelMapper.toDomain(machineLearningModel));

  return {
    modules,
    lessonMachineLearningModels,
  };
}
