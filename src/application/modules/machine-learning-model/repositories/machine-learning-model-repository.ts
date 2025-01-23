import { MachineLearningModel } from '../entities/machine-learning-model';

export interface MachineLearningModelRepository {
  createMachineLearningModel(MachineLearningModel: MachineLearningModel): Promise<void>
  updateMachineLearningModel(MachineLearningModel: MachineLearningModel): Promise<void>
  deleteMachineLearningModel(MachineLearningModelId: string): Promise<void>
  getMachineLearningModels(): Promise<MachineLearningModel[]>
  getMachineLearningModel(MachineLearningModelId: string): Promise<MachineLearningModel | null>
}
