import { ChapterRepository } from './chapter-repository';
import { PrismaChapterRepository } from './prisma/prisma-chapter-repository';

export function makeChapterRepository(): ChapterRepository {
  return new PrismaChapterRepository();
}
