
import { Account } from '../../entities/account';
import { AuthRepository } from '../auth-repository';
import { prismaAccountExists } from './functions/account-exists';

import { prismaCreateAccount } from './functions/create-account';
import { prismaFindAccountByEmail } from './functions/find-by-email';
import { prismaGetProfile } from './functions/get-profile';

export class PrismaAuthRepository implements AuthRepository {
  async getProfile(id: string): Promise<Account | null> {
    return prismaGetProfile(id);
  }

  async createAccount(account: Account): Promise<void> {
    await prismaCreateAccount(account);
  }

  async accountExists(email: string): Promise<boolean> {
    return prismaAccountExists(email);
  }

  async findByEmail(email: string): Promise<Account | null> {
    return prismaFindAccountByEmail(email);
  }
}
