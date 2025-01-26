import { Course } from '../entities/course';
import { CourseStudent } from '../entities/course-student';
import { CourseRepository } from './course-repository';
import { prismaCreateCourse } from './functions/create-course';
import { prismaDeleteCourse } from './functions/delete-course';
import { prismaGetCourse } from './functions/get-course';
import { prismaGetCourseStudent } from './functions/get-course-student';
import { prismaGetCourseStudentByCheckoutSessionId } from './functions/get-course-student-by-checkout-session-id';
import { prismaGetCourses } from './functions/get-courses';
import { prismaJoinCourse } from './functions/join-course';
import { prismaUpdateCourse } from './functions/update-course';
import { prismaUpdateStudentCheckoutSession } from './functions/update-course-student-checkout-session';
import { prismaUpdateCourseStudentPaymentStatus } from './functions/update-course-student-payment-status';

export class PrismaCourseRepository implements CourseRepository {
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

  async getCourses(): Promise<Course[]> {
    return prismaGetCourses();
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
