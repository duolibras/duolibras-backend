export const env = {
  baseUrl: process.env.BASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  awsS3: {
    bucketName: process.env.AWS_S3_BUCKET_NAME!,
    region: process.env.AWS_S3_REGION!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  stripe: {
    secretKey: process.env.STRIPE_TEST_SECRET_KEY!,
    webhookSignatureKey: process.env.STRIPE_WEBHOOK_SIGNATURE_KEY!,
  }
};
