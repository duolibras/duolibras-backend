import { IHttpRequest, IHttpResponse, IHttpStatusCode } from '../interfaces/http';

interface IHttpResponseContructor extends Pick<IHttpRequest, 'body'> {}

export class HttpResponse {
  constructor(private response?: IHttpResponseContructor) {}

  ok(): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.OK,
      ...this.response,
    };
  }

  created(): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.CREATED,
      ...this.response,
    };
  }

  noContent(): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.NO_CONTENT,
    };
  }
}
