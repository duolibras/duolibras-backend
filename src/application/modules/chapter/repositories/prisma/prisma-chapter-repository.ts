import { CountOperation } from '@/application/shared/types/count-operation';
import { Chapter } from '../../entities/chapter';
import { ChapterRepository } from '../chapter-repository';
import { prismaChangeLessonsCount } from './functions/change-lessons-count';
import { prismaCreateChapter } from './functions/create-chapter';
import { prismaDeleteChapter } from './functions/delete-chapter';
import { prismaGetChapter } from './functions/get-chapter';
import { prismaGetChapters } from './functions/get-chapters';
import { prismaUpdateChapter } from './functions/update-chapter';

export class PrismaChapterRepository implements ChapterRepository {
  async changeLessonsCount(chapter: Chapter, operation: CountOperation): Promise<void> {
    await prismaChangeLessonsCount(chapter, operation);
  }

  async getChapter(chapterId: string): Promise<Chapter | null> {
    return prismaGetChapter(chapterId);
  }
  async createChapter(chapter: Chapter): Promise<void> {
    return prismaCreateChapter(chapter);
  }

  async updateChapter(chapter: Chapter): Promise<void> {
    return prismaUpdateChapter(chapter);
  }

  async deleteChapter(chapterId: string): Promise<void> {
    return prismaDeleteChapter(chapterId);
  }

  async getChapters(unitId: string): Promise<Chapter[]> {
    return prismaGetChapters(unitId);
  }
}
