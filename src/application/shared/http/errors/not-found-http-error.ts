

import { IHttpStatusCode } from '../interfaces/http';
import { type ErrorMessage, HttpError } from './http-error';

export class NotFoundHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(IHttpStatusCode.NOT_FOUND, message);
  }
}
