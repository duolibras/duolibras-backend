import { CountOperation } from '@/application/shared/types/count-operation';
import { Course } from '../entities/course';
import { CourseStudent } from '../entities/course-student';
import { CourseRepository, IGetCourseQuery } from './course-repository';
import { prismaArchiveCourse } from './functions/archive-course';
import { prismaChangeCourseClassCount } from './functions/change-course-class-count';
import { prismaChangeCourseStudentsCount } from './functions/change-course-students-count';
import { prismaCorseHasStudents } from './functions/course-has-students';
import { prismaCreateCourse } from './functions/create-course';
import { prismaDeleteCourse } from './functions/delete-course';
import { prismaGetCourse } from './functions/get-course';
import { prismaGetCourseHasStudent } from './functions/get-course-has-student';
import { prismaGetCoursePreviewKey } from './functions/get-course-preview';
import { prismaGetCourseStudent } from './functions/get-course-student';
import { prismaGetCourseStudentByCheckoutSessionId } from './functions/get-course-student-by-checkout-session-id';
import { prismaGetCourses } from './functions/get-courses';
import { prismaJoinCourse } from './functions/join-course';
import { prismaUnarchiveCourse } from './functions/unarchive-course';
import { prismaUpdateCourse } from './functions/update-course';
import { prismaUpdateStudentCheckoutSession } from './functions/update-course-student-checkout-session';
import { prismaUpdateCourseStudentPaymentStatus } from './functions/update-course-student-payment-status';

export class PrismaCourseRepository implements CourseRepository {
  async getCourseHasStudent(courseId: string, studentId: string): Promise<boolean> {
    return prismaGetCourseHasStudent(courseId, studentId);
  }

  async getCoursePreviewKey(courseId: string): Promise<string | null> {
    return prismaGetCoursePreviewKey(courseId);
  }

  async changeCourseClassCount(courseId: string, operation: CountOperation): Promise<void> {
    await prismaChangeCourseClassCount(courseId, operation);
  }

  async changeCourseStudentsCount(courseId: string, operation: CountOperation): Promise<void> {
    await prismaChangeCourseStudentsCount(courseId, operation);
  }

  async archiveCourse(courseId: string): Promise<void> {
    await prismaArchiveCourse(courseId);
  }

  async unarchiveCourse(courseId: string): Promise<void> {
    await prismaUnarchiveCourse(courseId);
  }

  async courseHasStudents(courseId: string): Promise<boolean> {
    return prismaCorseHasStudents(courseId);
  }
  async updateCourseStudentCheckoutSession(courseStudent: CourseStudent): Promise<void> {
    await prismaUpdateStudentCheckoutSession(courseStudent);
  }

  async getCourseStudent(courseId: string, studentId: string): Promise<CourseStudent | null> {
    return prismaGetCourseStudent(courseId, studentId);
  }

  async getCourseStudentByCheckoutSessionId(checkoutSessionId: string): Promise<CourseStudent | null> {
    return prismaGetCourseStudentByCheckoutSessionId(checkoutSessionId);
  }

  async joinCourse(courseStudent: CourseStudent): Promise<void> {
    await prismaJoinCourse(courseStudent);
  }

  async updateCourseStudentPaymentStatus(courseStudent: CourseStudent): Promise<void> {
    await prismaUpdateCourseStudentPaymentStatus(courseStudent);
  }

  async getCourse(courseId: string): Promise<Course | null> {
    return prismaGetCourse(courseId);
  }

  async getCourses(accountId?: string, query?: IGetCourseQuery): Promise<Course[]> {
    return prismaGetCourses(accountId, query);
  }

  async createCourse(course: Course): Promise<void> {
    await prismaCreateCourse(course);
  }

  async updateCourse(course: Course): Promise<void> {
    await prismaUpdateCourse(course);
  }

  async deleteCourse(courseId: string): Promise<void> {
    await prismaDeleteCourse(courseId);
  }
}
