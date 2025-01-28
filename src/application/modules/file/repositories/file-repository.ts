export interface FileRepository {
  deleteFile(fileKey: string): Promise<void>
}
