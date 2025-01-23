import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Lesson } from '../../../entities/lesson';
import { LessonMapper } from '../../../mappers/lesson-mapper';

export async function prismaUpdateLesson(lesson: Lesson) {
  await prismaClient.lesson.update({
    where: { id: lesson.id },
    data: LessonMapper.toPersistence(lesson),
  });
}
