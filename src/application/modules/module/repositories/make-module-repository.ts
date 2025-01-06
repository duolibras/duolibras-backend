import { ModuleRepository } from './module-repository';
import { PrismaModuleRepository } from './prisma/prisma-module-repository';

export function makeModuleRepository(): ModuleRepository {
  return new PrismaModuleRepository();
}
