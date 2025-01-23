import { MachineLearningModel } from '../../machine-learning-model/entities/machine-learning-model';
import { Module } from '../entities/module';

export interface GetModulesResponse {
  modules: Module[];
  lessonMachineLearningModels: MachineLearningModel[];
}

export interface ModuleRepository {
  getModules(lessonId: string): Promise<GetModulesResponse>
}
