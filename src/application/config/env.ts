export const env = {
  jwtSecret: process.env.JWT_SECRET!,
  awsS3: {
    bucketName: process.env.AWS_S3_BUCKET_NAME!,
    region: process.env.AWS_S3_REGION!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
};
