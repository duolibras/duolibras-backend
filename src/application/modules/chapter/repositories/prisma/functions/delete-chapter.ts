import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaDeleteChapter(chapterId: string) {
  await prismaClient.chapter.delete({ where: { id: chapterId } });
}
