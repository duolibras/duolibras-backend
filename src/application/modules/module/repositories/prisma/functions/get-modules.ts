import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Module } from '../../../entities/module';
import { ModuleMapper } from '../../../mappers/module-mapper';

export async function prismaGetModules(lessonId: string): Promise<Module[]> {
  const modules = await prismaClient.module.findMany({
    where: {
      lessonId,
    },
    orderBy: {
      id: 'asc',
    }
  });

  return modules.map(ModuleMapper.toDomain);
}
