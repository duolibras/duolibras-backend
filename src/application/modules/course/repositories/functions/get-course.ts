import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Course } from '../../entities/course';
import { CourseMapper } from '../../mappers/course-mapper';

export async function prismaGetCourse(courseId: string): Promise<Course | null> {
  const course = await prismaClient.course.findUnique({
    where: { id: courseId },
  });

  return course ? CourseMapper.toDomain(course) : null;
}
