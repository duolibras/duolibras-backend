import { IController } from '@/application/shared/http/interfaces/controller';
import { NextFunction, Request, Response } from 'express';

interface Options {
  shallRedirect: boolean;
  bodyParamUrl: string;
}

export function routeAdapter(controller: IController, options?: Options) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {

      console.log(request.query);

      const { statusCode, body } = await controller.handle({
        body: request.body,
        params: request.params,
        query: request.query,
        account: request.metadata?.account,
        headers: request.headers as Record<string, string>,
        file: request.file,
        files: request.files,
      });

      if (options && options.shallRedirect && body) {
        return response.redirect(body[options.bodyParamUrl]);
      }

      response.status(statusCode).json(body);
    } catch (error) {
      next(error);
    }
  };
}
