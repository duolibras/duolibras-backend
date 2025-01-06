import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Account } from '../../../entities/account';
import { AccountMapper } from '../../../mappers/account-mapper';

export async function prismaGetProfile(id: string): Promise<Account | null> {
  const account = await prismaClient.account.findUnique({ where: { id } });

  if (!account) {
    return null;
  }

  return AccountMapper.toDomain(account);
}
