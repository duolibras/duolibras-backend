import { fileUploadMiddleware, FileUploadOptions } from '../file-upload/file-upload-middleware';

export function makeFileUploadMiddleware<T extends string>(options: FileUploadOptions<T>) {
  return fileUploadMiddleware(options);
}
