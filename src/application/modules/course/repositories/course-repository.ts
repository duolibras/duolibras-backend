import { Course } from '../entities/course';

export interface CourseRepository {
  getCourse(courseId: string): Promise<Course | null>;
  getCourses(): Promise<Course[]>;
  createCourse(course: Course): Promise<void>;
  updateCourse(course: Course): Promise<void>;
  deleteCourse(courseId: string): Promise<void>;
}
