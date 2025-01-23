import { Prisma, MachineLearningModel as RawMachineLearningModel } from '@prisma/client';
import { MachineLearningModel } from '../entities/machine-learning-model';

export class MachineLearningModelMapper {
  static toPersistence(machinelearningmodel: MachineLearningModel): Prisma.MachineLearningModelCreateInput {
    return {
      id: machinelearningmodel.id,
      name: machinelearningmodel.name,
      description: machinelearningmodel.description,
      weightsKey: machinelearningmodel.weightsKey,
      modelKey: machinelearningmodel.modelKey,
      metadataKey: machinelearningmodel.metadataKey,
      createdAt: machinelearningmodel.createdAt,
      updatedAt: machinelearningmodel.updatedAt,
    };
  }

  static toDomain(data: RawMachineLearningModel): MachineLearningModel {
    return new MachineLearningModel({
      id: data.id,
      name: data.name,
      description: data.name,
      metadataKey: data.metadataKey,
      modelKey: data.modelKey,
      weightsKey: data.weightsKey,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(data: MachineLearningModel) {
    return {
      id: data.id,
      name: data.name,
      description: data.name,
      metadataUrl: data.metadataUrl,
      modelUrl: data.modelUrl,
      weightsUrl: data.weightsUrl,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toSummaryHttp(data: MachineLearningModel) {
    return {
      id: data.id,
      name: data.name,
      description: data.name,
      metadataUrl: data.metadataUrl,
      modelUrl: data.modelUrl,
      weightsUrl: data.weightsUrl,
    };
  }
}
