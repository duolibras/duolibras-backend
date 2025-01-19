import { Prisma, Content as RawContent } from '@prisma/client';
import { Content } from '../entities/content';

export class ContentMapper {
  static toPersistence(content: Content): Prisma.ContentCreateInput {
    return {
      id: content.id,
      name: content.name,
      description: content.description,
      videoKey: content.videoKey,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
      lesson: {
        connect: {
          id: content.lessonId,
        }
      },
      module: {
        connectOrCreate: {
          create: {
            id: content.module.id,
            type: content.module.type,
            lessonId: content.lessonId,
            createdAt: content.createdAt,
            updatedAt: content.updatedAt,
          },
          where: {
            id: content.module.id,
          }
        }
      }
    };
  }

  static toDomain(data: RawContent): Content {
    return new Content({
      id: data.id,
      name: data.name,
      description: data.description,
      lessonId: data.lessonId,
      videoKey: data.videoKey,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(data: Content) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      videoKey: data.videoKey,
      lessonId: data.lessonId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toSummaryHttp(data: Content) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      videoKey: data.videoKey,
      lessonId: data.lessonId,
    };
  }
}
