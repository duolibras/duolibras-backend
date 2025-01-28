import { GeneratePresignedPostResult } from '@/application/shared/providers/storage-provider/storage-provider';
import { Prisma, File as RawFile } from '@prisma/client';
import { File, FileStatus } from '../entities/file';

export class FileMapper {
  static toPersistence(fileKey: string): Prisma.FileCreateInput {
    const data = new File({
      fileKey,
      status: FileStatus.PENDING,
    });

    return {
      fileKey: data.fileKey,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toDomain(data: RawFile) {
    return new File({
      fileKey: data.fileKey,
      status: data.status as FileStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    });
  }

  static presignedToHttp(file?: File | null) {
    return file?.presignedPost && {
      url: file.presignedPost.presignedUrl,
      fields: file.presignedPost.fields,
    };
  }

  static rawPresignedToHttp(presigned?: GeneratePresignedPostResult | null) {
    return presigned && {
      url: presigned.presignedUrl,
      fields: presigned.fields,
    };
  }
}
