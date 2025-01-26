import { prismaClient } from '@/application/shared/clients/prisma-clients';

import { CourseStudent } from '../../entities/course-student';
import { CourseStudentMapper } from '../../mappers/course-student-mapper';

export async function prismaGetCourseStudent(courseId: string, studentId: string):
Promise<CourseStudent | null> {
  const courseStudent = await prismaClient.courseStudent.findUnique({
    where: {
      studentId_courseId: {
        courseId,
        studentId
      }
    },
  });

  return courseStudent ? CourseStudentMapper.toDomain(courseStudent) : null;
}
