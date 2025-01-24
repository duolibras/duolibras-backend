import { Prisma, Lesson as RawLesson } from '@prisma/client';
import { Lesson } from '../entities/lesson';


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

  static toDomain(data: RawLesson): Lesson {
    return new Lesson({
      id: data.id,
      name: data.name,
      chapterId: data.chapterId,
      modulesCount: data.modulesCount,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
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
    };
  }
}
