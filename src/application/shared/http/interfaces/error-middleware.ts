import { IHttpResponse } from './http';

export interface IData {
  data: Record<string, any>;
}

export interface IErrorMiddleware {
  handle(error: unknown): IHttpResponse | IData;
}
