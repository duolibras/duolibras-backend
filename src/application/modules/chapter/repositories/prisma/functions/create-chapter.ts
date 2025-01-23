import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Chapter } from '../../../entities/chapter';
import { ChapterMapper } from '../../../mappers/chapter-mapper';

export async function prismaCreateChapter(chapter: Chapter) {
  await prismaClient.chapter.create({
    data: ChapterMapper.toPersistence(chapter),
  });
}
