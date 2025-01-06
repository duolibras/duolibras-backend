
import { IHttpStatusCode } from '../interfaces/http';
import { type ErrorMessage, HttpError } from './http-error';

export class BadRequestHttpError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(IHttpStatusCode.BAD_REQUEST, message);
  }
}
