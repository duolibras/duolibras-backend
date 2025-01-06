import { IHttpStatusCode } from '../interfaces/http';

export type ErrorMessage = string;

export class HttpError extends Error {
  constructor(
    public readonly statusCode: IHttpStatusCode,
    message?: ErrorMessage
  ) {
    super(message);

    this.name = 'HttpError';
  }
}
