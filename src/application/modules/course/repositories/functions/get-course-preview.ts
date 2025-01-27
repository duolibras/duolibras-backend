import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaGetCoursePreviewKey(courseId: string) {
  const course = await prismaClient.course.findUnique({
    where: { id: courseId },
    select: {
      videoKey: true,
    }
  });

  if (!course) {
    throw new Error('Curso não encontrado');
  }

  return course.videoKey ?? null;
}
