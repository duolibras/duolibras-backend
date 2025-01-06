import { AuthRepository } from './auth-repository';
import { PrismaAuthRepository } from './prisma/prisma-auth-repository';

export function makeAuthRepository(): AuthRepository {
  return new PrismaAuthRepository();
}
