import { CountOperation } from '@/application/shared/types/count-operation';
import { Lesson } from '../entities/lesson';

export interface LessonRepository {
  createLesson(lesson: Lesson): Promise<void>
  updateLesson(lesson: Lesson): Promise<void>
  deleteLesson(lessonId: string): Promise<void>
  getLessons(chapterId: string): Promise<Lesson[]>
  getLesson(lessonId: string): Promise<Lesson | null>
  changeModulesCount(lessonId: string, operation: CountOperation): Promise<void>;
  connectMachineLearningModel(lessonId: string, machineLearningModelId: string): Promise<void>;
  disconnectMachineLearningModel(lessonId: string, machineLearningModelId: string): Promise<void>;
}
