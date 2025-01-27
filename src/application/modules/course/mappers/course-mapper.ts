import { HttpMapper } from '@/application/shared/mappers/mapper';
import { Prisma, Course as RawCourse, CourseStudentPaymentStatus as RawCourseStudentPaymentStatus } from '@prisma/client';
import { Course } from '../entities/course';
import { CourseStudentPaymentStatus } from '../entities/course-student';


type RawCourseWithStudent = RawCourse & {
  students: {
    paymentStatus: RawCourseStudentPaymentStatus;
  }[];
}

export class CourseMapper {
  static toPersistence(domain: Course): Prisma.CourseCreateInput {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      priceInCents: domain.priceInCents,
      preemium: domain.preemium,
      classCount: domain.classCount,
      studentsCount: 0,
      archived: domain.archived,
      stripeCourseId: domain.stripeCourseId,
      teacher: {
        connect: {
          id: domain.teacherId,
        }
      },
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toDomain(data: RawCourseWithStudent): Course {
    const owned = data.students?.[0]?.paymentStatus === CourseStudentPaymentStatus.APPROVED;

    return new Course({
      id: data.id,
      name: data.name,
      description: data.description,
      classCount: data.classCount,
      preemium: data.preemium,
      studentsCount: data.studentsCount,
      archived: data.archived,
      priceInCents: data.priceInCents ?? 0,
      teacherId: data.teacherId,
      owned: owned,
      stripeCourseId: data.stripeCourseId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(data: Course): HttpMapper<Course> {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      preemium: data.preemium,
      priceInCents: data.priceInCents,
      classCount: data.classCount,
      studentsCount: data.studentsCount,
      teacherId: data.teacherId,
      archived: data.archived,
      owned: data.owned,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toSummaryHttp(data: Course): HttpMapper<Course> {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      preemium: data.preemium,
      priceInCents: data.priceInCents,
      classCount: data.classCount,
      studentsCount: data.studentsCount,
      teacherId: data.teacherId,
      archived: data.archived,
      owned: data.owned,
    };
  }
}
