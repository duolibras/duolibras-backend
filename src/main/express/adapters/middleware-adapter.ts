import { IMiddleware } from '@/application/shared/http/interfaces/middleware';
import { NextFunction, Request, Response } from 'express';

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await middleware.handle({
        body: request.body,
        params: request.params,
        account: request.metadata?.account,
        headers: request.headers as Record<string, string>,
        file: request.file,
        files: request.files,
      });

      if ('statusCode' in result) {
        return response.status(result.statusCode).json(result.body);
      }

      request.metadata = {
        ...request.metadata,
        ...result.data,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
}
