import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { CourseStudent } from '../../entities/course-student';
import { CourseStudentMapper } from '../../mappers/course-student-mapper';

export async function prismaJoinCourse(courseStudent: CourseStudent) {
  await prismaClient.courseStudent.create({
    data: CourseStudentMapper.toPersistence(courseStudent)
  });
}
