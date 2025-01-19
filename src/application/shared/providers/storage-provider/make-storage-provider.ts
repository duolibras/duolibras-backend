
import { env } from '@/application/config/env';
import { S3 } from '@aws-sdk/client-s3';
import { AWSS3StorageProvider } from './aws-s3-storage-provider';
import { StorageProvider } from './storage-provider';

export function makeStorageProvider(): StorageProvider {
  const s3 = new S3({
    region: env.awsS3.region,
    credentials: {
      accessKeyId: env.awsS3.accessKeyId,
      secretAccessKey: env.awsS3.secretAccessKey,
    }
  });

  return new AWSS3StorageProvider(s3);
}
