
import { Account } from '@/application/modules/account/entities/account';
import { AccountMapper } from '@/application/modules/account/mappers/account-mapper';
import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaCreateAccount(account: Account) {
  await prismaClient.account.create({
    data: AccountMapper.toPersistence(account),
  });
}
