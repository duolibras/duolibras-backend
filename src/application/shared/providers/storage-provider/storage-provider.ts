export interface FileStorageResult {
  fileKey: string;
}


export interface StorageProvider {
  save(filePath: string): Promise<FileStorageResult>;
  remove(fileKey: string): Promise<void>;
  generatePresignedUrl(fileKey: string, expiration: number): Promise<string | null>;
}
