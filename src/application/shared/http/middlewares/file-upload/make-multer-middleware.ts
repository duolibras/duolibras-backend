import { RequestHandler } from 'express';
import multer, { Field } from 'multer';

import { Fields, MulterFileType } from './shared';

interface MakeMulterMiddlewareParams<T extends string> {
  upload: multer.Multer;
  multerFileType: MulterFileType;
  fieldName: string;
  fields?: Fields<T>;
}

export function makeMulterMiddleware<T extends string>({ fieldName, multerFileType, upload, fields }: MakeMulterMiddlewareParams<T>) {
  let multerMiddleware: RequestHandler;
  switch (multerFileType) {
  case MulterFileType.SingleFile:
    multerMiddleware = upload.single(fieldName);
    break;
  case MulterFileType.MultipleFiles:
    multerMiddleware = upload.array(fieldName);
    break;
  case MulterFileType.MixedFiles:
    if (fields === undefined) {
      throw new Error('FileUpload with MixedFiles requires the fields param');
    }

    // eslint-disable-next-line no-case-declarations
    const multerFields: Field[] = Object.entries<{ maxCount: number }>(fields).map<Field>(([field, value]) => ({
      name: field,
      maxCount: value.maxCount,
    }));
    multerMiddleware = upload.fields(multerFields);
    break;
  default:
    throw new Error('Invalid multer file type.');
  }

  return { multerMiddleware };
}
