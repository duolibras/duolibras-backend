import { Prisma, Course as RawCourse, CourseStudentPaymentStatus as RawCourseStudentPaymentStatus } from '@prisma/client';
import { File, FileStatus } from '../../file/entities/file';
import { FileMapper } from '../../file/mappers/file-mapper';
import { Course } from '../entities/course';
import { CourseStudentPaymentStatus } from '../entities/course-student';


type RawCourseWithStudent = RawCourse & {
  students?: {
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
      banner: {
        connectOrCreate: domain.banner ? {
          create: FileMapper.toPersistence(domain.banner),
          where: { fileKey: domain.banner.fileKey }
        } : undefined
      },
      video: {
        connectOrCreate: domain.video ? {
          create: FileMapper.toPersistence(domain.video),
          where: { fileKey: domain.video.fileKey }
        } : undefined
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
      banner: data.bannerKey ? new File({
        fileKey: data.bannerKey,
        status: FileStatus.UPLOADED,
      }) : undefined,
      video: data.videoKey ? new File({
        fileKey: data.videoKey,
        status: FileStatus.UPLOADED,
      }) : undefined,
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

  static toHttp(data: Course) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      bannerUrl: data.bannerUrl,
      videoUrl: data.videoUrl,
      preemium: data.preemium,
      priceInCents: data.priceInCents,
      classCount: data.classCount,
      studentsCount: data.studentsCount,
      teacherId: data.teacherId,
      archived: data.archived,
      owned: data.owned,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      presignedUrls: {
        banner: FileMapper.presignedToHttp(data.banner),
        video: FileMapper.presignedToHttp(data.video),
      }
    };
  }

  static toSummaryHttp(data: Course) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      bannerUrl: data.bannerUrl,
      hasVideoPreview: !!data.video,
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
