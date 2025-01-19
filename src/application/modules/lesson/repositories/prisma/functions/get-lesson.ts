import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Lesson } from '../../../entities/lesson';
import { LessonMapper } from '../../../mappers/lesson-mapper';

export async function prismaGetLesson(lessonId: string): Promise<Lesson | null> {
  const lesson = await prismaClient.lesson.findUnique({
    where: { id: lessonId },
    include: {
      machineLearningModels: {
        include: {
          machineLearningModel: true
        }
      }
    }
  });

  return lesson ? LessonMapper.toDomain(lesson) : null;
}
