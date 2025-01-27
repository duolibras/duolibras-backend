import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { CountOperation } from '@/application/shared/types/count-operation';

export async function prismaChangeCourseClassCount(courseId: string, operation: CountOperation) {
  const course = await prismaClient.course.findUnique({
    where: { id: courseId },
    select: { classCount: true }
  });

  if (!course) {
    throw new NotFoundHTTPError('Curso não encontrado!');
  }

  const newClassCount = operation === 'INCREMENT'
    ? course.classCount + 1
    : course.classCount - 1;

  await prismaClient.course.update({
    where: { id: courseId },
    data: {
      classCount: newClassCount
    }
  });
}
