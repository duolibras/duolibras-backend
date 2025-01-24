import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Course } from '../../entities/course';
import { CourseMapper } from '../../mappers/course-mapper';

export async function prismaGetCourses(): Promise<Course[]> {
  const courses = await prismaClient.course.findMany();

  return courses.map(CourseMapper.toDomain);
}
