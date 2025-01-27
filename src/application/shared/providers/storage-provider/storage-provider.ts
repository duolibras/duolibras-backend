export interface FileStorageResult {
  fileKey: string;
}

export interface GeneratePresignedPostInput {
  filename: string;
  fileType: string;
  fileSize: number;
}

export interface GeneratePresignedPostResult {
  presignedUrl: string;
  fileKey: string;
  fields: Record<string, string>
}

export interface UploadOoptions {
  expiresIn: number;
  publicAccess: boolean;
  stripe?: {
    isStripeImage: boolean;
    stripeAccountId: string;
    stripeProductId: string;
  };
}


export interface StorageProvider {
  save(filePath: string): Promise<FileStorageResult>;
  remove(fileKey: string): Promise<void>;
  generatePresignedPostUrl(file: GeneratePresignedPostInput, options: UploadOoptions): Promise<GeneratePresignedPostResult>;
  generatePresignedUrl(fileKey: string, expiration: number, video?: boolean): Promise<string | null>;
}
