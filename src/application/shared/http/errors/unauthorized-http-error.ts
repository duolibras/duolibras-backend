

import { IHttpStatusCode } from '../interfaces/http';
import { type ErrorMessage, HttpError } from './http-error';

export class UnauthorizedHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(IHttpStatusCode.UNAUTHORIZED, message);
  }
}
