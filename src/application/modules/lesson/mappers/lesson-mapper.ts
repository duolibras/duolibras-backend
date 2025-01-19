import { Prisma, Lesson as RawLesson, MachineLearningModel as RawMachineLearningModel } from '@prisma/client';
import { MachineLearningModelMapper } from '../../machine-learning-model/mappers/machine-learning-model-mapper';
import { Lesson } from '../entities/lesson';

interface RawLessonWithMachineLearningModels extends RawLesson {
  machineLearningModels?: {
    machineLearningModel: RawMachineLearningModel;
  }[]
}

export class LessonMapper {
  static toPersistence(lesson: Lesson): Prisma.LessonCreateInput {
    return {
      id: lesson.id,
      name: lesson.name,
      modulesCount: lesson.modulesCount,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
      chapter: {
        connect: {
          id: lesson.chapterId,
        }
      }
    };
  }

  static toDomain(data: RawLessonWithMachineLearningModels): Lesson {
    return new Lesson({
      id: data.id,
      name: data.name,
      chapterId: data.chapterId,
      modulesCount: data.modulesCount,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      machineLearningModels: data.machineLearningModels?.map(
        ({ machineLearningModel }) =>
          MachineLearningModelMapper.toDomain(machineLearningModel)
      ) ?? [],
    });
  }

  static toHttp(data: Lesson) {
    return {
      id: data.id,
      name: data.name,
      modulesCount: data.modulesCount,
      chapterId: data.chapterId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toSummaryHttp(data: Lesson) {
    return {
      id: data.id,
      name: data.name,
      modulesCount: data.modulesCount,
      chapterId: data.chapterId,
      machineLearningModels: data.machineLearningModels.map(
        MachineLearningModelMapper.toSummaryHttp
      ),
    };
  }
}
