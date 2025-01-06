import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Chapter } from '../../../entities/chapter';
import { ChapterMapper } from '../../../mappers/chapter-mapper';

export async function prismaUpdateChapter(chapter: Chapter) {
  await prismaClient.chapter.update({
    where: { id: chapter.id },
    data: ChapterMapper.toPersistence(chapter),
  });
}
