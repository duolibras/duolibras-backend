import { prismaClient } from '@/application/shared/clients/prisma-clients';

import { CourseStudent } from '../../entities/course-student';
import { CourseStudentMapper } from '../../mappers/course-student-mapper';

export async function prismaGetCourseStudentByCheckoutSessionId(checkoutSessionId: string):
Promise<CourseStudent | null> {
  const course = await prismaClient.courseStudent.findUnique({
    where: { checkoutSessionId },
  });

  return course ? CourseStudentMapper.toDomain(course) : null;
}
