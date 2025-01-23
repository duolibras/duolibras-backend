import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaDeleteLesson(lessonId: string) {
  await prismaClient.lesson.delete({ where: { id: lessonId } });
}
