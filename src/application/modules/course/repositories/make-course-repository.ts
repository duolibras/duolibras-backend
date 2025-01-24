import { CourseRepository } from './course-repository';
import { PrismaCourseRepository } from './prisma-course-repository';

export function makeCourseRepository(): CourseRepository {
  return new PrismaCourseRepository();
}
