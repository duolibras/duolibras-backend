import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Account } from '../../../entities/account';
import { AccountMapper } from '../../../mappers/account-mapper';

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
