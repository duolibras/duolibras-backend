import { ContentRepository } from './content-repository';
import { PrismaContentRepository } from './prisma/prisma-content-repository';

export function makeContentRepository(): ContentRepository {
  return new PrismaContentRepository();
}
