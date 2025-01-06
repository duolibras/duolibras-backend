import { IHttpRequest, IHttpResponse } from './http';

export interface IData {
  data: Record<string, any>;
}

export interface IMiddleware {
  handle(request: IHttpRequest): Promise<IHttpResponse | IData>;
}
