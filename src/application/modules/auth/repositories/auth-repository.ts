import { Account } from '@/application/modules/account/entities/account';

export interface AuthRepository {
  findByEmail(email: string): Promise<Account | null>;
  accountExists(email: string): Promise<boolean>;
  createAccount(account: Account): Promise<void>;
  getProfile(id: string): Promise<Account | null>;
}
