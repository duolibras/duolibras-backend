import { Course } from '../entities/course';
import { CourseStudent } from '../entities/course-student';

export interface IGetCourseQuery {
  teacherId?: string;
  owned?: boolean;
  creator?: boolean;
  archived?: boolean;
}

export interface CourseRepository {
  getCourse(courseId: string): Promise<Course | null>;
  getCourses(accountId: string, query?: IGetCourseQuery): Promise<Course[]>;
  createCourse(course: Course): Promise<void>;
  updateCourse(course: Course): Promise<void>;
  deleteCourse(courseId: string): Promise<void>;

  courseHasStudents(courseId: string): Promise<boolean>;
  archiveCourse(courseId: string): Promise<void>;
  unarchiveCourse(courseId: string): Promise<void>;

  joinCourse(courseStudent: CourseStudent): Promise<void>;
  getCourseStudent(courseId: string, studentId: string): Promise<CourseStudent | null>
  getCourseStudentByCheckoutSessionId(checkoutSessionId: string): Promise<CourseStudent | null>
  updateCourseStudentCheckoutSession(courseStudent: CourseStudent): Promise<void>;
  updateCourseStudentPaymentStatus(courseStudent: CourseStudent): Promise<void>;
}
