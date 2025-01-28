import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaArchiveClass(classId: string) {
  await prismaClient.class.update({
    where: { id: classId },
    data: { archived: true }
  });
}
