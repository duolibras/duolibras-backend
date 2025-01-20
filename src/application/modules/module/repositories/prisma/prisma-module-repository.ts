import { GetModulesResponse, ModuleRepository } from '../module-repository';
import { prismaGetModules } from './functions/get-modules';


export class PrismaModuleRepository implements ModuleRepository {
  async getModules(lessonId: string): Promise<GetModulesResponse> {
    return prismaGetModules(lessonId);
  }
}
