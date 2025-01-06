import { Chapter } from '../../entities/chapter';
import { ChapterRepository } from '../chapter-repository';
import { prismaCreateChapter } from './functions/create-chapter';
import { prismaDeleteChapter } from './functions/delete-chapter';
import { prismaGetChapter } from './functions/get-chapter';
import { prismaGetChapters } from './functions/get-chapters';
import { prismaUpdateChapter } from './functions/update-chapter';

export class PrismaChapterRepository implements ChapterRepository {
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
