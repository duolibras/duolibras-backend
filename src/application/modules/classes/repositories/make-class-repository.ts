import { PrismaClassRepository } from './prisma-class-repository';

export function makeClassRepository() {
  return new PrismaClassRepository();
}
