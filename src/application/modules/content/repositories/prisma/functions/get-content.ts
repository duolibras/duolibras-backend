import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Content } from '../../../entities/content';
import { ContentMapper } from '../../../mappers/content-mapper';

export async function prismaGetContent(contentId: string): Promise<Content | null> {
  const content = await prismaClient.content.findUnique({
    where: { id: contentId },
    include: {
      module: true,
    }
  });

  return content ? ContentMapper.toDomain(content) : null;
}
