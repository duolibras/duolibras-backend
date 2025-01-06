import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Account } from '../../../entities/account';
import { AccountMapper } from '../../../mappers/account-mapper';

export async function prismaCreateAccount(account: Account) {
  await prismaClient.account.create({
    data: AccountMapper.toPersistence(account),
  });
}
