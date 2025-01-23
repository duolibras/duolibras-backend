import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Content } from '../../../entities/content';
import { ContentMapper } from '../../../mappers/content-mapper';

export async function prismaGetContents(lessonId: string): Promise<Content[]> {
  const contents = await prismaClient.content.findMany({
    where: {
      lessonId,
    },
    orderBy: {
      id: 'asc',
    }
  });

  return contents.map(ContentMapper.toDomain);
}
