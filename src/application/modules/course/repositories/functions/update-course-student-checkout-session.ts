import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { CourseStudent } from '../../entities/course-student';

export async function prismaUpdateStudentCheckoutSession(courseStudent: CourseStudent) {
  await prismaClient.courseStudent.update({
    where: {
      studentId_courseId: {
        studentId: courseStudent.studentId,
        courseId: courseStudent.courseId,
      }
    },
    data: {
      checkoutSessionId: courseStudent.checkoutSessionId,
      checkoutUrl: courseStudent.checkoutUrl,
      paymentStatus: courseStudent.paymentStatus,
      updatedAt: courseStudent.updatedAt,
    }
  });
}
