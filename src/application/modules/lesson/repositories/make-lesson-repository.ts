import { LessonRepository } from './lesson-repository';
import { PrismaLessonRepository } from './prisma/prisma-lesson-repository';

export function makeLessonRepository(): LessonRepository {
  return new PrismaLessonRepository();
}
