import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaAccountExists(email: string): Promise<boolean> {
  const account = await prismaClient.account.findUnique({ where: { email }, select: { id: true } });

  return !!account;
}
