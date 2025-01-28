import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaDeleteClass(classId: string) {
  await prismaClient.class.delete({
    where: { id: classId },
  });
}
