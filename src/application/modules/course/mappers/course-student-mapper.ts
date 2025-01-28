import { HttpMapper } from '@/application/shared/mappers/mapper';
import { Prisma, CourseStudent as RawCourseStudent } from '@prisma/client';
import { CourseStudent, CourseStudentPaymentStatus } from '../entities/course-student';

export class CourseStudentMapper {
  static toPersistence(data: RawCourseStudent): Prisma.CourseStudentCreateInput {
    return {
      course: { connect: { id: data.courseId } },
      student: { connect: { id: data.studentId } },
      checkoutSessionId: data.checkoutSessionId,
      paymentStatus: data.paymentStatus,
      checkoutUrl: data.checkoutUrl,
      feedbackRate: data.feedbackRate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toDomain(data: RawCourseStudent): CourseStudent {
    return new CourseStudent({
      courseId: data.courseId,
      studentId: data.studentId,
      checkoutSessionId: data.checkoutSessionId,
      checkoutUrl: data.checkoutUrl,
      feedbackRate: data.feedbackRate,
      paymentStatus: data.paymentStatus as CourseStudentPaymentStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(data: CourseStudent): HttpMapper<CourseStudent> {
    return {
      studentId: data.studentId,
      courseId: data.courseId,
      feedbackRate: data.feedbackRate,
      paymentStatus: data.paymentStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  }
}
