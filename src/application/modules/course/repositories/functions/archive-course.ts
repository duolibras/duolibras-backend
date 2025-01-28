import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaArchiveCourse(courseId: string) {
  await prismaClient.course.update({
    where: { id: courseId },
    data: { archived: true }
  });
}
