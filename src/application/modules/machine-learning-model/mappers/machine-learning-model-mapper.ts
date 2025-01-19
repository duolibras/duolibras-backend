import { Prisma, MachineLearningModel as RawMachineLearningModel } from '@prisma/client';
import { MachineLearningModel } from '../entities/machine-learning-model';

export class MachineLearningModelMapper {
  static toPersistence(machinelearningmodel: MachineLearningModel): Prisma.MachineLearningModelCreateInput {
    return {
      id: machinelearningmodel.id,
      name: machinelearningmodel.name,
      description: machinelearningmodel.description,
      weightsUrl: machinelearningmodel.weightsUrl,
      modelUrl: machinelearningmodel.modelUrl,
      metadataUrl: machinelearningmodel.metadataUrl,
      createdAt: machinelearningmodel.createdAt,
      updatedAt: machinelearningmodel.updatedAt,
    };
  }

  static toDomain(data: RawMachineLearningModel): MachineLearningModel {
    return new MachineLearningModel({
      id: data.id,
      name: data.name,
      description: data.name,
      metadataUrl: data.metadataUrl,
      modelUrl: data.modelUrl,
      weightsUrl: data.weightsUrl,
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
