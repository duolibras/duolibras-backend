import { AccountRepository } from './account-repository';
import { PrismaAccountRepository } from './prisma-account-repository';

export function makeAccountRepository(): AccountRepository {
  return new PrismaAccountRepository();
}
