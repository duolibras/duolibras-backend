import { MachineLearningModelRepository } from './machine-learning-model-repository';
import { PrismaMachineLearningModelRepository } from './prisma/prisma-machine-learning-model-repository';

export function makeMachineLearningModelRepository(): MachineLearningModelRepository {
  return new PrismaMachineLearningModelRepository();
}
