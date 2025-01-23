import multer from 'multer';

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { makeMulterMiddleware } from './make-multer-middleware';
import { makeMulterOptions } from './make-multer-options';
import { Fields, LimitsByMimeTypes, MulterFileType } from './shared';

export interface FileUploadOptions<T extends string> {
  fieldName: string;
  fields?: Fields<T>;
  multerFileType: MulterFileType;
  fileName?: (file: Express.Multer.File) => string;
  limitsByMimeTypes: LimitsByMimeTypes<T>;
  isRequired?: boolean;
}

export function fileUploadMiddleware<T extends string>(options: FileUploadOptions<T>): RequestHandler[] {
  const { fieldName, limitsByMimeTypes, multerFileType, fields } = options;

  const upload = multer(makeMulterOptions({ fields, limitsByMimeTypes, multerFileType }));
  const { multerMiddleware } = makeMulterMiddleware({ fieldName, fields, multerFileType, upload });

  return [
    (request: Request, response: Response, next: NextFunction) => {
      multerMiddleware(request, response, function (error: unknown) {
        if (error) {
          return next(error);
        }

        next();
      });
    },
    (request: Request, _response: Response, next: NextFunction) => {
      const fieldValues = request.body[fieldName];

      if (fieldValues !== undefined && !Array.isArray(fieldValues)) {
        const array = [fieldValues];
        request.body = {
          ...request.body,
          [fieldName]: array,
        };
      }

      next();
    },
  ];
}
