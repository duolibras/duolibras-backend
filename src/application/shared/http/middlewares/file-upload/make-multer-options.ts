import { Request } from 'express';
import multer from 'multer';

import { ulid } from 'ulid';
import { Fields, LimitsByMimeTypes, MulterFileType } from './shared';

interface MakeMulterOptionsParams<T extends string> {
  fileName?: (file: Express.Multer.File) => string;
  multerFileType: MulterFileType;
  limitsByMimeTypes: LimitsByMimeTypes<T>;
  fields?: Fields<T>;
}

type FileFilter = (_request: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => void;

function makeDefaultFileFilter<T>(limitsByMimeTypes: LimitsByMimeTypes<T>): FileFilter {
  return (_request: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    const matchingLimit = limitsByMimeTypes.find((limitByMimeType) => {
      return limitByMimeType.mimeTypes.includes(file.mimetype);
    });

    if (matchingLimit) {
      const maxFileSize = matchingLimit.maxFileSizeInBytes;
      if (maxFileSize && file.size > maxFileSize) {
        return callback(new Error(`File size exceeds the maximum limit of ${maxFileSize} bytes.`));
      }
      callback(null, true);
    } else {
      callback(new Error(`Invalid file type: ${file.mimetype} (${file.originalname}).`));
    }
  };
}

function makeMixedFilesFileFilter<T extends string>(fields: Fields<T>, limitsByMimeTypes: LimitsByMimeTypes<T>): FileFilter {
  return (_request: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    Object.keys(fields).forEach((fieldName) => {
      if (fieldName !== file.fieldname) return callback(null, true);

      const limitByMimeTypesByFieldname = limitsByMimeTypes.filter(
        (limitByMimeType) => limitByMimeType.fieldName === fieldName,
      );

      const matchingLimit = limitByMimeTypesByFieldname.find((limitByMimeType) => {
        if (limitByMimeType.fieldName === undefined) {
          throw new Error('FieldName at limitsByMimeTypes are required in MixedFiles');
        }

        return limitByMimeType.fieldName === fieldName && limitByMimeType.mimeTypes.includes(file.mimetype);
      });

      if (matchingLimit) {
        const maxFileSize = matchingLimit.maxFileSizeInBytes;
        if (maxFileSize && file.size > maxFileSize) {
          return callback(new Error(`File size exceeds the maximum limit of ${maxFileSize} bytes.`));
        }
        return callback(null, true);
      } else {
        return callback(new Error(`Invalid file type: ${file.mimetype} (${file.originalname}).`));
      }
    });
  };
}

export function makeMulterOptions<T extends string>({
  multerFileType,
  limitsByMimeTypes,
  fields,
  fileName = () => ulid(),
}: MakeMulterOptionsParams<T>) {
  let fileFilter: FileFilter;
  switch (multerFileType) {
  case MulterFileType.SingleFile:
    fileFilter = makeDefaultFileFilter(limitsByMimeTypes);
    break;
  case MulterFileType.MultipleFiles:
    fileFilter = makeDefaultFileFilter(limitsByMimeTypes);
    break;
  case MulterFileType.MixedFiles:
    if (fields === undefined) {
      throw new Error('FileUpload with MixedFiles requires the fields param');
    }

    fileFilter = makeMixedFilesFileFilter(fields, limitsByMimeTypes);
    break;
  default:
    throw new Error('Invalid multer file type.');
  }

  const storage = multer.diskStorage({
    filename(_request, file, callback) {
      const type = '.' + file.originalname.split('.').pop();
      callback(null, fileName(file) + type);
    },
  });

  return {
    fileFilter,
    storage,
  };
}
