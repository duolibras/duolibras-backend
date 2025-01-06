import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Chapter } from '../../../entities/chapter';
import { ChapterMapper } from '../../../mappers/chapter-mapper';

export async function prismaGetChapters(unitId: string): Promise<Chapter[]> {
  const chapters = await prismaClient.chapter.findMany({
    where: {
      unitId,
    },
    orderBy: {
      id: 'asc',
    }
  });

  return chapters.map(ChapterMapper.toDomain);
}
