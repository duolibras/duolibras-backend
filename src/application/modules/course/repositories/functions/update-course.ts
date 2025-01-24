import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Course } from '../../entities/course';
import { CourseMapper } from '../../mappers/course-mapper';

export async function prismaUpdateCourse(course: Course): Promise<void> {
  await prismaClient.course.update({
    where: { id: course.id },
    data: CourseMapper.toPersistence(course),
  });
}
