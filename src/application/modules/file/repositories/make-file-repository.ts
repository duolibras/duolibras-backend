import { PrismaFilerepository } from './prisma-file-repository';

export function makeFileRepository() {
  return new PrismaFilerepository();
}
