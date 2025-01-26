import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';

export async function prismaCorseHasStudents(courseId: string) {
  const course = await prismaClient.course.findUnique({
    where: { id: courseId },
    select: { studentsCount: true }
  });

  if (!course) {
    throw new NotFoundHTTPError('Curso não encontrado');
  }

  return course.studentsCount > 0;
}
