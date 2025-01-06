import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Chapter } from '../../../entities/chapter';
import { ChapterMapper } from '../../../mappers/chapter-mapper';

export async function prismaGetChapter(chapterId: string): Promise<Chapter | null> {
  const chapter = await prismaClient.chapter.findUnique({ where: { id: chapterId } });

  return chapter ? ChapterMapper.toDomain(chapter) : null;
}
