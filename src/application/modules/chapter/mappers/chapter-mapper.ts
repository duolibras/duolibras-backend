import { Prisma, Chapter as RawChapter } from '@prisma/client';
import { Chapter } from '../entities/chapter';


export class ChapterMapper {
  static toPersistence(chapter: Chapter): Prisma.ChapterCreateInput {
    return {
      id: chapter.id,
      name: chapter.name,
      description: chapter.description,
      lessonsCount: chapter.lessonsCount,
      createdAt: chapter.createdAt,
      updatedAt: chapter.updatedAt,
      unit: {
        connect: {
          id: chapter.unitId,
        }
      }
    };
  }

  static toDomain(data: RawChapter): Chapter {
    return new Chapter({
      id: data.id,
      name: data.name,
      description: data.description,
      unitId: data.unitId,
      lessonsCount: data.lessonsCount,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(data: Chapter) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      lessonsCount: data.lessonsCount,
      unitId: data.unitId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toSummaryHttp(data: Chapter) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      lessonsCount: data.lessonsCount,
    };
  }
}
