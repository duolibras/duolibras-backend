import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Content } from '../../../entities/content';
import { ContentMapper } from '../../../mappers/content-mapper';

export async function prismaCreateContent(content: Content) {
  await prismaClient.content.create({
    data: ContentMapper.toPersistence(content),
  });
}
