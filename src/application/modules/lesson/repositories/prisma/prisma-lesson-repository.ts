import { CountOperation } from '@/application/shared/types/count-operation';
import { Lesson } from '../../entities/lesson';
import { LessonRepository } from '../lesson-repository';
import { prismaChangeModulesCount } from './functions/change-modules-count';
import { prismaConnectMachineLearningModel } from './functions/connect-machine-learning-model';
import { prismaCreateLesson } from './functions/create-lesson';
import { prismaDeleteLesson } from './functions/delete-lesson';
import { prismaDisconnectMachineLearningModel } from './functions/disconnect-machine-learning-model';
import { prismaGetLesson } from './functions/get-lesson';
import { prismaGetLessons } from './functions/get-lessons';
import { prismaUpdateLesson } from './functions/update-lesson';

export class PrismaLessonRepository implements LessonRepository {
  async disconnectMachineLearningModel(lessonId: string, machineLearningModelId: string): Promise<void> {
    await prismaDisconnectMachineLearningModel(lessonId, machineLearningModelId);
  }

  async connectMachineLearningModel(lessonId: string, machineLearningModelId: string): Promise<void> {
    await prismaConnectMachineLearningModel(lessonId, machineLearningModelId);
  }
  async changeModulesCount(lessonId: string, operation: CountOperation): Promise<void> {
    await prismaChangeModulesCount(lessonId, operation);
  }

  async getLesson(lessonId: string): Promise<Lesson | null> {
    return prismaGetLesson(lessonId);
  }
  async createLesson(lesson: Lesson): Promise<void> {
    return prismaCreateLesson(lesson);
  }

  async updateLesson(lesson: Lesson): Promise<void> {
    return prismaUpdateLesson(lesson);
  }

  async deleteLesson(lessonId: string): Promise<void> {
    return prismaDeleteLesson(lessonId);
  }

  async getLessons(chapterId: string): Promise<Lesson[]> {
    return prismaGetLessons(chapterId);
  }
}
