import { CountOperation } from '@/application/shared/types/count-operation';
import { Chapter } from '../entities/chapter';

export interface ChapterRepository {
  createChapter(chapter: Chapter): Promise<void>
  updateChapter(chapter: Chapter): Promise<void>
  deleteChapter(chapterId: string): Promise<void>
  getChapters(unitId: string): Promise<Chapter[]>
  getChapter(chapterId: string): Promise<Chapter | null>
  changeLessonsCount(chapterId: string, operation: CountOperation): Promise<void>;
}
