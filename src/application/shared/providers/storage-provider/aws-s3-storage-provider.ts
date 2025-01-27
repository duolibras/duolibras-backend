
import { GetObjectCommand, S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs-extra';
import mime from 'mime-types';
import path from 'path';


import { env } from '@/application/config/env';
import { ulid } from 'ulid';
import { FileStorageResult, GeneratePresignedPostInput, GeneratePresignedPostResult, StorageProvider, UploadOoptions } from './storage-provider';


export class AWSS3StorageProvider implements StorageProvider {
  constructor(
    private readonly s3: S3,
  ) {}

  static generatePublicUrl(fileKey: string): string {
    return `https://${env.awsS3.bucketName}.s3.${env.awsS3.region}.amazonaws.com/${fileKey}`;
  }

  async generatePresignedPostUrl(file: GeneratePresignedPostInput, options: UploadOoptions): Promise<GeneratePresignedPostResult> {
    const { fileSize, fileType, filename } = file;
    const { expiresIn, publicAccess, stripe } = options;

    const prefix = stripe?.isStripeImage ? 'stripe/' : '';
    const dir = publicAccess ? `public/${prefix}` : `private/${prefix}`;

    const fileKeyPrefix = stripe?.isStripeImage
      ? `${stripe.stripeAccountId}-${stripe.stripeProductId}-`
      : '';

    const fileKey = `${dir}${fileKeyPrefix}${ulid()}-${filename}`;

    const { fields, url } = await createPresignedPost(this.s3, {
      Bucket: env.awsS3.bucketName,
      Key: fileKey,
      Expires: expiresIn,
      Conditions: [
        ['content-length-range', fileSize, fileSize],
        { 'Content-Type': fileType },
      ],
      Fields: {
        'Content-Type': fileType,
      },
    });

    return {
      fileKey,
      presignedUrl: url,
      fields,
    };
  }

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
