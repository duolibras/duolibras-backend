
import { Account } from '@/application/modules/account/entities/account';
import { AccountMapper } from '@/application/modules/account/mappers/account-mapper';
import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaGetProfile(id: string): Promise<Account | null> {
  const account = await prismaClient.account.findUnique({ where: { id } });

  if (!account) {
    return null;
  }

  return AccountMapper.toDomain(account);
}
