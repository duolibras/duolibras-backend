import { Module } from '../entities/module';

export interface ModuleRepository {
  getModules(chapterId: string): Promise<Module[]>
}
