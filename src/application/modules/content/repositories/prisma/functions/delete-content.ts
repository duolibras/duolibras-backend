import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaDeleteContent(contentId: string) {
  await prismaClient.content.delete({ where: { id: contentId } });
}
