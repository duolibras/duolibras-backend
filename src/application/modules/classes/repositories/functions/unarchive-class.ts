import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaUnarchiveClass(classId: string) {
  await prismaClient.class.update({
    where: { id: classId },
    data: { archived: false }
  });
}
