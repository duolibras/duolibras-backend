export enum MulterFileType {
  SingleFile,
  MultipleFiles,
  MixedFiles,
}

export type SingleFile = Express.Multer.File | undefined;
export type MultipleFiles = Express.Multer.File[] | undefined;
export type MixedFiles<FileNames extends string = string> = Record<FileNames, MultipleFiles>;

export type Fields<T extends string> = Record<T, { maxCount: number }>;

export type LimitsByMimeTypes<T = unknown> = Array<{
  mimeTypes: string[];
  maxFileSizeInBytes?: number;
  fieldName?: T;
}>;
