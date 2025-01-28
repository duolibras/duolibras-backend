import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { CourseStudentPaymentStatus } from '../../entities/course-student';

export async function prismaGetCourseHasStudent(courseId: string, studentId: string) {
  const courseStudent = await prismaClient.courseStudent.findUnique({
    where: {
      studentId_courseId: {
        courseId,
        studentId,
      }
    },
    select: {
      paymentStatus: true,
    }
  });

  return courseStudent?.paymentStatus === CourseStudentPaymentStatus.APPROVED;
}
