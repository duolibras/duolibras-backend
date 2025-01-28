
import { Account } from '@/application/modules/account/entities/account';
import { AccountMapper } from '@/application/modules/account/mappers/account-mapper';
import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaFindAccountByEmail(email: string): Promise<Account | null> {
  const account = await prismaClient.account.findUnique({ where: { email }, select: {
    id: true,
    email: true,
    name: true,
    password: true,
    roleCode: true,
    createdAt: true,
    updatedAt: true,
  }});

  if (!account) {
    return null;
  }

  return AccountMapper.toDomain(account);
}
