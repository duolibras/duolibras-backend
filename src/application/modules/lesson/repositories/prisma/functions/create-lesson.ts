import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Lesson } from '../../../entities/lesson';
import { LessonMapper } from '../../../mappers/lesson-mapper';

export async function prismaCreateLesson(lesson: Lesson) {
  await prismaClient.lesson.create({
    data: LessonMapper.toPersistence(lesson),
  });
}
