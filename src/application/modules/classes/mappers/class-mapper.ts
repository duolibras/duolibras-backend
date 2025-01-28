import { Prisma, Class as RawClass } from '@prisma/client';
import { FileMapper } from '../../file/mappers/file-mapper';
import { Class } from '../entities/class';


export class ClassMapper {
  static toPersistence(data: Class): Prisma.ClassCreateInput {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      banner: {
        connectOrCreate: data.bannerKey ? {
          create: FileMapper.toPersistence(data.bannerKey),
          where: { fileKey: data.bannerKey }
        } : undefined
      },
      video: {
        connectOrCreate: data.videoKey ? {
          create: FileMapper.toPersistence(data.videoKey),
          where: { fileKey: data.videoKey }
        } : undefined
      },
      archived: data.archived,
      teacher: {
        connect: {
          id: data.teacherId,
        }
      },
      course: {
        connect: {
          id: data.courseId,
        }
      },
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toDomain(data: RawClass): Class {
    return new Class({
      id: data.id,
      name: data.name,
      description: data.description,
      archived: data.archived,
      courseId: data.courseId,
      teacherId: data.teacherId,
      bannerKey: data.bannerKey,
      videoKey: data.videoKey,
      presignedPost: {}
    });
  }

  static toHttp(data: Class) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      archived: data.archived,
      bannerUrl: data.bannerUrl,
      videoUrl: data.videoUrl,
      courseId: data.courseId,
      teacherId: data.teacherId,
      presignedPosts: {
        banner: FileMapper.rawPresignedToHttp(data.bannerPresignedPost),
        video: FileMapper.rawPresignedToHttp(data.videoPresignedPost),
      }
    };
  }

  static toSummaryHttp(data: Class) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      archived: data.archived,
      bannerUrl: data.bannerUrl,
    };
  }
}
