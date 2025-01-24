import { Course } from '../entities/course';
import { CourseRepository } from './course-repository';
import { prismaCreateCourse } from './functions/create-course';
import { prismaDeleteCourse } from './functions/delete-course';
import { prismaGetCourse } from './functions/get-course';
import { prismaGetCourses } from './functions/get-courses';
import { prismaUpdateCourse } from './functions/update-course';

export class PrismaCourseRepository implements CourseRepository {
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
