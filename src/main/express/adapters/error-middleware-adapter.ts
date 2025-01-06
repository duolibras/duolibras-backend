/* eslint-disable @typescript-eslint/no-unused-vars */
import { IErrorMiddleware } from '@/application/shared/http/interfaces/error-middleware';
import { NextFunction, Request, Response } from 'express';

export function errorMiddlewareAdapter(middleware: IErrorMiddleware) {
  return (error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    const result = middleware.handle(error);

    if ('statusCode' in result) {
      return response.status(result.statusCode).json(result.body);
    }
  };
}
