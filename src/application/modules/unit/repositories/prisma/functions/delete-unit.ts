import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaDeleteUnit(unitId: string) {
  await prismaClient.unit.delete({ where: { id: unitId } });
}
