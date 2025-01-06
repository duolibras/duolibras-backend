import { Module } from '../../entities/module';
import { ModuleRepository } from '../module-repository';
import { prismaGetModules } from './functions/get-modules';

export class PrismaModuleRepository implements ModuleRepository {
  async getModules(chapterId: string): Promise<Module[]> {
    return prismaGetModules(chapterId);
  }
}
