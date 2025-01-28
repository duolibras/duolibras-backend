import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Course } from '../../entities/course';
import { CourseMapper } from '../../mappers/course-mapper';

export async function prismaCreateCourse(course: Course): Promise<void> {
  await prismaClient.course.create({
    data: CourseMapper.toPersistence(course),
  });
}
