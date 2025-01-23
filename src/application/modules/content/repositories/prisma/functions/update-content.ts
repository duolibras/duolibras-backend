import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Content } from '../../../entities/content';
import { ContentMapper } from '../../../mappers/content-mapper';

export async function prismaUpdateContent(content: Content) {
  const updatedData = ContentMapper.toPersistence(content);
  delete updatedData.module;

  await prismaClient.content.update({
    where: { id: content.id },
    data: updatedData,
  });
}
