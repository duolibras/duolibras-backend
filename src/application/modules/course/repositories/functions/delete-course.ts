import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaDeleteCourse(courseId: string): Promise<void> {
  await prismaClient.course.delete({
    where: { id: courseId },
  });
}
