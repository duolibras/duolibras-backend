export interface FileStorageResult {
  fileKey: string;
}

export interface GeneratePresignedPostResult {
  presignedUrl: string;
  fileKey: string;
}


export interface StorageProvider {
  save(filePath: string): Promise<FileStorageResult>;
  remove(fileKey: string): Promise<void>;
  generatePresignedPostUrl(filename: string, expiresIn: number): Promise<GeneratePresignedPostResult>;
  generatePresignedUrl(fileKey: string, expiration: number, video?: boolean): Promise<string | null>;
}
