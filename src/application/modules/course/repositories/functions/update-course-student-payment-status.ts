import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { CourseStudent } from '../../entities/course-student';

export async function prismaUpdateCourseStudentPaymentStatus(courseStudent: CourseStudent) {
  await prismaClient.courseStudent.update({
    where: {
      studentId_courseId: {
        courseId: courseStudent.courseId,
        studentId: courseStudent.studentId,
      }
    },
    data:  {
      paymentStatus: courseStudent.paymentStatus,
      checkoutUrl: null,
    }
  });
}
