import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { CountOperation } from '@/application/shared/types/count-operation';

export async function prismaChangeCourseStudentsCount(courseId: string, operation: CountOperation) {
  const course = await prismaClient.course.findUnique({
    where: { id: courseId },
    select: { studentsCount: true }
  });

  if (!course) {
    throw new NotFoundHTTPError('Curso não encontrado!');
  }

  const newStudentsCount = operation === 'INCREMENT'
    ? course.studentsCount + 1
    : course.studentsCount - 1;

  await prismaClient.course.update({
    where: { id: courseId },
    data: {
      studentsCount: newStudentsCount
    }
  });
}
