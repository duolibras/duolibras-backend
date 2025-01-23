import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Lesson } from '../../../entities/lesson';
import { LessonMapper } from '../../../mappers/lesson-mapper';

export async function prismaGetLessons(chapterId: string): Promise<Lesson[]> {
  const lessons = await prismaClient.lesson.findMany({
    where: {
      chapterId,
    },
    orderBy: {
      id: 'asc',
    },
  });

  return lessons.map(LessonMapper.toDomain);
}
