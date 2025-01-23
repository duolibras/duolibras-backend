
import { GetObjectCommand, S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs-extra';
import mime from 'mime-types';
import path from 'path';


import { env } from '@/application/config/env';
import { ulid } from 'ulid';
import { FileStorageResult, StorageProvider } from './storage-provider';


export class AWSS3StorageProvider implements StorageProvider {
  constructor(
    private readonly s3: S3,
  ) {}

  async generatePresignedUrl(fileKey: string, expiration: number, video: boolean = false): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: env.awsS3.bucketName,
      Key: fileKey,
      ResponseContentType: video ? 'video/mp4' : 'application/octet-stream',
    });

    return getSignedUrl(this.s3, command, {
      expiresIn: expiration,
    });
  }

  async save(filePath: string): Promise<FileStorageResult> {
    const fileStream = fs.createReadStream(filePath);
    const fileKey =  `${ulid()}-${path.basename(filePath)}`;
    const contentType = mime.lookup(filePath) || 'application/octet-stream';

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: env.awsS3.bucketName,
        Key: fileKey,
        Body: fileStream,
        ContentType: contentType,
      },
    });

    await upload.done();

    return {
      fileKey,
    };
  }

  async remove(fileKey: string): Promise<void> {
    await this.s3.deleteObject({
      Bucket: env.awsS3.bucketName,
      Key: fileKey,
    });
  }
}
